import { createClient } from "@1password/sdk";
import fetch from 'node-fetch';

const { OP_SERVICE_ACCOUNT_TOKEN } = process.env;

export default async (event) => {
  const submission = JSON.parse(event.body).payload.data
  const email = submission.email
  const tag = submission.tag
  console.log(`Received a submission: ${email}, ${tag}`)

  const client = await createClient({
    auth: OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "Netlify and 1Password Demo",
    integrationVersion: "v1.0.0",
  });
  
  const secret = await client.secrets.resolve("op://website/buttondown-api/credential");

  try {
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
	    }
    );

    let responseText = await response.text();
    console.log('Response:', responseText);

  } catch (error) {
    console.log(error);
    
    return Response.redirect("https://andrewstiefel.com/almost", 302)
  }
};