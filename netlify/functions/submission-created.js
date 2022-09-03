const fetch = require("node-fetch");
const { CONVERTKIT_API_KEY } = process.env;

import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    const EMAIL = JSON.parse(event.body).payload.email
    console.log(`Received a submission`)

    const { SUBSCRIBER } = {
        api_key: CONVERTKIT_API_KEY,
        email: EMAIL,
        tags: [newsletter]
      };

    return fetch('https://api.convertkit.com/v3/forms/2655631/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify( SUBSCRIBER ),
         })
            .then(response => response.json())
            .then(data => {
                console.log('Submitted to ConvertKit')
            })
            .catch (error => ({ statusCode: 422, body: String(error) }))
}