import fetch from 'node-fetch';
import { createClient } from "@1password/sdk";

const { OP_SERVICE_ACCOUNT_TOKEN } = process.env;

export default async (req, context) => {

  const client = await createClient({
    auth: OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "Fathom Analytics Kudos API",
    integrationVersion: "v1.0.0",
  });
  
  const secret = await client.secrets.resolve("op://website/fathom-api/credential");

  const response = await fetch( 'https://api.usefathom.com/v1/aggregations', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ 
      entity: "pageview",
      entity_id: "kudos",
      aggregates: "pageviews",
      property: "pathname",
      operator: "is",
      value: "/style-atom-xsl/",
     }),
  });

  return new Response("Hello, world!");
};
