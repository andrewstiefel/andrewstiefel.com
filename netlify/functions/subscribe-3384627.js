const { CONVERTKIT_API_KEY } = process.env;

import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    const email = event.queryStringParameters.email || "No email";
    console.log(`Received a submission: ${email}`)

    const response = await fetch(
        'https://api.convertkit.com/v3/forms/3384627/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                api_key: CONVERTKIT_API_KEY,
                email: email
             }),
        }
    );
    let responseText = await response.text();
    console.log('response:', responseText);
    return {
        statusCode: 302,
        headers: {
            'Location': 'https://andrewstiefel.com/almost/?utm_campaign=subscribe-newsletter&utm_source=convertkit',
            'Cache-Control': 'no-cache',
        },
    }
}