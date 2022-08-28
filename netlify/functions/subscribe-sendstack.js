const { SENDSTACK_API_KEY } = process.env;

import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    const email = event.queryStringParameters.email || "No email";
    console.log(`Received a submission: ${email}`)

    const response = await fetch(
        'https://getsendstack.com/api/subscribers', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${SENDSTACK_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
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