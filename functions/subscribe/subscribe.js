/* eslint-disable */

// // optionally configure local env vars
require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const fetch = require('node-fetch')
const { CONVERTKIT_API_KEY } = process.env
exports.handler = async event => {
  const email = JSON.parse(event.body).payload.email
  console.log(`Recieved a submission: ${email}`)
  return fetch('https://api.convertkit.com/v3/forms/d9d0c34d5f/subscribe', {
    method: 'POST',
    headers: {
      Authorization: `Token ${CONVERTKIT_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then(response => response.json())
    .then(data => {
      console.log(`Submitted to Buttondown:\n ${data}`)
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
}
