const fetch = require("node-fetch");
const { CONVERTKIT_API_KEY } = process.env;

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
        statusCode: response.status,
        body: responseText,
    };
}


/*
exports.handler = async (event, context) => {
    const email = event.queryStringParameters.email || "No email";
    console.log(`Received a submission: ${email}`)
    return fetch ('https://api.convertkit.com/v3/forms/3384627/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: CONVERTKIT_API_KEY,
            email: email
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(`Submitted to ConvertKit: ${data}`);
      })
    .catch (error => ({ statusCode: 422, body: String(error) }))
  }
  */