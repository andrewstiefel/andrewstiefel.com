import querystring from "querystring";

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Find email
  const params = querystring.parse(event.body);
  const email = params.email || "";

  // Subscribe an email

  var request = require('request');
  request.post({
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    url: 'https://api.convertkit.com/v3/forms/d9d0c34d5f/subscribe',
    body: {
      api_key: 'hQIOi5G6xVzZBQ0hRZTfKg',
      email: '${email}',
      tags: [ 'Newsletter' ]
      },
    }, function(error, response, body){
      console.log(body);
    });
};
