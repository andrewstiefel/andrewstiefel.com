import { createClient } from "@1password/sdk";
import fetch from 'node-fetch';

const { OP_SERVICE_ACCOUNT_TOKEN } = process.env;

exports.handler = async (event, context) => {
  const submission = JSON.parse(event.body).payload.data
  const email = submission.email
  const tag = submission.tag
  console.log(`Received a submission: ${email}, ${tag}`)

  const client = await createClient({
    auth: OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "Netlify and 1Password Demo",
    integrationVersion: "v1.0.0",
  });

  const secret = await client.secrets.resolve("op://sdk-beta/hello-world/credential");

  const response = await fetch('https://api.buttondown.email/v1/subscribers', {
		  method: 'POST',
		  headers: {
			  Authorization: `Token ${secret}`,
			  'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ 
        email: email,
        tags: [tag]
        }),
	    }
    );

  let responseText = await response.text();
  console.log('Response:', responseText);
  
  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
};