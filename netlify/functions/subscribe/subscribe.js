const fetch = require("node-fetch");

const { CONVERTKIT_API_KEY } = process.env;

exports.handler = async (event, context) => {
    const { EMAIL } = JSON.parse(event.body).payload.email
    console.log(`Received a submission: ${EMAIL}`)
    
    const { SUBSCRIBER } = {
        api_key: CONVERTKIT_API_KEY,
        email: EMAIL,
      };

    return fetch('https://api.convertkit.com/v3/forms/3384627/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify( SUBSCRIBER ),
         })
            .then(response => response.json())
            .then(data => {
                console.log('Submitted to ConvertKit:\n ${data')
            })
            .catch (error => ({ statusCode: 422, body: String(error) }))
}