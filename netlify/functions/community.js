const crypto = require("node:crypto");
const { getStore } = require("@netlify/blobs");

const NOTION_VERSION = "2022-06-28";

const jsonHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type",
  "content-type": "application/json",
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body),
  };
}

function readBody(event) {
  if (!event.body) return {};

  const rawBody = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
  const contentType = event.headers?.["content-type"] || event.headers?.["Content-Type"] || "";

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  return JSON.parse(rawBody);
}

async function notionRequest(path, options = {}) {
  const token = process.env.NOTION_API_KEY;
  if (!token) {
    throw new Error("NOTION_API_KEY is not configured");
  }

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "notion-version": NOTION_VERSION,
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.message || `Notion request failed with ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function cleanText(value, fallback = "") {
  return String(value || fallback).trim();
}

function cleanEmail(value) {
  return cleanText(value).toLowerCase();
}

function signupKey(email) {
  const digest = crypto.createHash("sha256").update(email).digest("hex").slice(0, 32);
  return `member-${digest}`;
}

function richText(content) {
  return {
    rich_text: [{ text: { content: cleanText(content, "Not provided") } }],
  };
}

function normalizeSignup(body) {
  const email = cleanEmail(body.email);
  const name = cleanText(body.name, email || "Community member");
  const focus = cleanText(body.focus, "Not specified");
  const consentValue = body.newsletterConsent ?? body["newsletter-consent"];

  return {
    name,
    email,
    focus,
    newsletterConsent: consentValue === true || consentValue === "true" || consentValue === "on",
    source: cleanText(body.source, "ozzypm.com community form"),
    submittedAt: new Date().toISOString(),
  };
}

async function saveCommunitySignup(signup) {
  const store = getStore("ozzypm-community-members");
  const key = signupKey(signup.email);
  const existing = await store.get(key, { type: "json" }).catch(() => null);
  const record = {
    ...(existing || {}),
    ...signup,
    id: key,
    createdAt: existing?.createdAt || signup.submittedAt,
    updatedAt: signup.submittedAt,
  };

  await store.setJSON(key, record, {
    metadata: {
      email: signup.email,
      focus: signup.focus,
      newsletterConsent: signup.newsletterConsent,
      updatedAt: signup.submittedAt,
    },
  });

  return { id: key, createdAt: record.createdAt, updatedAt: record.updatedAt };
}

async function createCommunityMember(signup) {
  const databaseId = process.env.NOTION_COMMUNITY_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_COMMUNITY_DATABASE_ID is not configured");
  }

  return notionRequest("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: signup.name } }],
        },
        Email: {
          email: signup.email,
        },
        "PM Focus": richText(signup.focus),
        "Newsletter Consent": {
          checkbox: signup.newsletterConsent,
        },
        Source: richText(signup.source),
        "Submitted At": {
          date: { start: signup.submittedAt },
        },
      },
    }),
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: jsonHeaders, body: "" };
  }

  if (event.httpMethod === "GET") {
    return json(200, {
      mode: "community-signup-endpoint",
      primaryStore: "netlify-blobs",
      optionalSync: "notion",
      optionalEnv: ["NOTION_API_KEY", "NOTION_COMMUNITY_DATABASE_ID"],
      requiredProperties: ["Name", "Email", "PM Focus", "Newsletter Consent", "Source", "Submitted At"],
    });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const signup = normalizeSignup(readBody(event));
    if (!signup.email) {
      return json(400, { error: "Email is required" });
    }

    const stored = await saveCommunitySignup(signup);
    const notionConfigured = Boolean(process.env.NOTION_API_KEY && process.env.NOTION_COMMUNITY_DATABASE_ID);

    if (!notionConfigured) {
      return json(200, {
        mode: "community-member-captured",
        storage: "netlify-blobs",
        id: stored.id,
        notionSync: "not-configured",
      });
    }

    try {
      const page = await createCommunityMember(signup);
      return json(200, {
        mode: "community-member-captured",
        storage: "netlify-blobs",
        id: stored.id,
        notionSync: "created",
        notionPageId: page.id,
        notionUrl: page.url,
      });
    } catch (notionError) {
      return json(200, {
        mode: "community-member-captured",
        storage: "netlify-blobs",
        id: stored.id,
        notionSync: "failed",
        warning: notionError.message,
      });
    }
  } catch (error) {
    return json(500, { error: error.message });
  }
};
