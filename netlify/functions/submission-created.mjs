import fetch from "node-fetch";
import sdk from "@1password/sdk";

const { OP_SERVICE_ACCOUNT_TOKEN } = process.env;

// Parse event submissions
export default async (request) => {
  let payload;
  try {
    ({ payload } = await request.json());
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  // Accept only the form you expect
  if (payload.form_name !== "bd-newsletter-default") {
    return new Response("Ignored", { status: 202 });
  }

  const { email, tag, referrer_url: rawUrl } = payload.data ?? {};

  // Validate email
  const normalEmail = email?.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalEmail)) {
    return new Response("Invalid email", { status: 422 });
  }

  // Validate tag
  const allowedTags = ["newsletter", "posts"];
  if (!allowedTags.includes(tag)) {
    return new Response("Invalid tag", { status: 422 });
  }

  // Validate URL
  let safeUrl;
  if (rawUrl) {
    try {
      const u = new URL(rawUrl);
      if (u.protocol === "http:" || u.protocol === "https:") safeUrl = u.toString();
    } catch {/* ignore bad URL */}
  }

  console.log(`Received submission: ${normalEmail}, ${tag}, ${safeUrl}`);

  // Fetch API key from 1Password
  const client  = await sdk.createClient({
    auth: OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "andrewstiefel.com",
    integrationVersion: "v1.2",
  });
  const apiKey  = await client.secrets.resolve(
    "op://website/buttondown-api/credential"
  );

  // Form the headers
  const authHeaders = {
    Authorization: `Token ${apiKey}`,
    "Content-Type": "application/json",
    "X-Buttondown-Collision-Behavior": "add",
  };

  // Upsert subscriber
  const upsertRes = await fetch(
    "https://api.buttondown.email/v1/subscribers",
    {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        email_address: normalEmail,
        tags: [tag],
        referrer_url: safeUrl,
      }),
    },
  );

  if (!upsertRes.ok) {
    const err = await upsertRes.text();
    console.error("Buttondown error:", upsertRes.status, err);
    return new Response("Upsert failed", { status: 502 });
  }

  const sub = await upsertRes.json();
  const isNew = upsertRes.status === 201;      // 201 = brand-new subscriber

  // Send reminder only for existing unconfirmed addresses
  if (!isNew && sub.type === "unactivated") {
    await fetch(
      `https://api.buttondown.com/v1/subscribers/${encodeURIComponent(
        normalEmail,
      )}/send-reminder`,
      { method: "POST", headers: authHeaders },
    );
  }

  return new Response(
    JSON.stringify({
      status:
        !isNew && sub.type === "unactivated"
          ? "reminder-sent"
          : isNew
          ? "created"
          : "updated",
      tags: sub.tags,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};