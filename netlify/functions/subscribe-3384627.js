const fetch = require("node-fetch");
const { CONVERTKIT_API_KEY } = process.env;

exports.handler = async (event, context) => {
    const email = JSON.parse(event.body).payload.email
    console.log(`Received a submission: ${email}`)
    return fetch('https://api.convertkit.com/v3/forms/3384627/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: CONVERTKIT_API_KEY,
                email: email
            }),
         })
            .then(response => response.json())
            .then(data => {
                console.log('Submitted to ConvertKit:\n ${data}')
            })
            .catch (error => ({ statusCode: 422, body: String(error) }))
}
