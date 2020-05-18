const apiKey = process.env.CONVERTKIT_API_KEY;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const email = event.queryStringParameters.email ||

  const data = {
    api_key: apiKey,
    email: email,
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
