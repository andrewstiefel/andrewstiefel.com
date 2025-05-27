import fetch from 'node-fetch';
import { createClient } from "@1password/sdk";

const { OP_SERVICE_ACCOUNT_TOKEN } = process.env;

// Parse the event data
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
  let safeUrl = undefined;
  if (rawUrl) {
    try {
      const u = new URL(rawUrl);
      if (u.protocol === "http:" || u.protocol === "https:") safeUrl = u.toString();
    } catch { /* ignore invalid URL */ }
  }

  console.log(`Received submission: ${normalEmail}, ${tag}`);

  // Create 1Password client
  const client = await createClient({
    auth: OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "andrewstiefel.com",
    integrationVersion: "v1.2",
  });
  
  // Fetch the API key
  const apiKey = await client.secrets.resolve("op://website/buttondown-api/credential");

  // Form the headers
  const authHeaders = {
    Authorization: `Token ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Upsert the subscriber
  const upsertRes = await fetch( 'https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
        ...authHeaders,
        "X-Buttondown-Collision-Behavior": "add",
      },
    headers: authHeaders,
    body: JSON.stringify({ 
      email_address: email,
      tags: [tag],
      referrer_url: url,
     }),
  });

  // Log the response
  const sub = await upsertRes.json();

  // Handle the success response
  if (createRes.status === 201) {
    return new Response(
      JSON.stringify({ status: "created" }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  }

  // Send a reminder if a duplicate request
  if (sub.type === "unactivated") {
    await fetch(
      `https://api.buttondown.com/v1/subscribers/${encodeURIComponent(
        email,
      )}/send-reminder`,
      { method: "POST", headers: authHeaders },
    );
  }

  // Respond to caller
  return new Response(
    JSON.stringify({
      status: sub.type === "unactivated" ? "reminder-sent" : "updated",
      tags: sub.tags,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};