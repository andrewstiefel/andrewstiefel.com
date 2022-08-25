require('dotenv').config()
const fetch = require('node-fetch')
const { CONVERTKIT_API_KEY } = process.env
exports.handler = async (event) => {
  const email = JSON.parse(event.body).payload.email
  console.log(`Received a submission: ${email}`)
  const subscriber = {
    api_key: CONVERTKIT_API_KEY,
    email: email,
  };
  try {
    const response = await fetch('https://api.convertkit.com/v3/forms/3384627/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; chartset=utf-8',
      },
      body: JSON.stringify({ subscriber }),
    })
    const data = await response.json()
    console.log(`Submitted to ConvertKit:\n ${data}`)
  } catch (error) {
    return { statusCode: 422, body: String(error) }
  }
}

module.exports = { handler }