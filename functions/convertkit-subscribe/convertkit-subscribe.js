const request = require("request");

exports.handler = async (event, context) => {

  const email = event.queryStringParameters.email || 'Oops, no email';
  const data = {
    api_key: 'hQIOi5G6xVzZBQ0hRZTfKg',
    email: '${email}',
  };

  const subscriber = JSON.stringify(data);
  console.log("Sending data to convertkit", subscriber);

  // Subscribe an email

  request({
    method: "POST",
    url: 'https://api.convertkit.com/v3/forms/d9d0c34d5f/subscribe',
    body: subscriber,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  };
};
