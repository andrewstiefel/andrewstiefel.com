import { parse } from 'querystring'
const apiKey = process.env.CONVERTKIT_API_KEY;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body = {}
  console.log(event)
  try {
    body = JSON.parse(event.body)
  } catch (e) {
    body = parse(event.body)
  }

  if (!body.email) {
    console.log('missing email')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing email'
      })
    })
  }

  const data = {
    api_key: apiKey,
    email: body.email,
    tags: [newsletter],
  };

  const subscriber = JSON.stringify(data);
  console.log("Sending data to convertkit", subscriber);

  // Subscribe an email

  var request = require('request');
  request.post({
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    url: 'https://api.convertkit.com/v3/forms/d9d0c34d5f/subscribe',
    body: subscriber,
    }, function(error, response, body){
      console.log(body);
    });
};
