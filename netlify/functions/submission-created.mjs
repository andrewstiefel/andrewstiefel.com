import fetch from 'node-fetch';
import { createClient } from "@1password/sdk";

const { OP_SERVICE_ACCOUNT_TOKEN } = process.env;

export default async (request) => {
  const body = await request.json();
  console.log(body);
  const email = body.payload.email;
  const tag = body.payload.tag;
  console.log(`Received a submission: ${email}, ${tag}`);

  const client = await createClient({
    auth: OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "Netlify and 1Password Demo",
    integrationVersion: "v1.0.0",
  });
  
  const secret = await client.secrets.resolve("op://website/buttondown-api/credential");

  const response = await fetch( 'https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${secret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email: email,
      tags: [tag]
     }),
  });

  let responseText = await response.text();
  console.log('Received response:', responseText);
    
  return new Response()
};