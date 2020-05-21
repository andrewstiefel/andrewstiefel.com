const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const email = event.queryStringParameters.email || 'Oops, no email';
  const data = {
    api_key: 'hQIOi5G6xVzZBQ0hRZTfKg',
    email: email,
  };

  const subscriber = JSON.stringify(data);

  // Subscribe the user

  return fetch('https://api.convertkit.com/v3/forms/1369284/subscribe', {
        method: 'post',
        body:    subscriber,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
    .then(res => res.json())
    .then(data => {
      console.log('Success:', data);
    })
    .then() => {
      window.location.replace("new target URL");
    }
    .catch((error) => {
      console.error('Error:', error);
  });
};
