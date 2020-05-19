const fetch = require("node-fetch");

exports.handler = async (event, context) => {

  const email = event.queryStringParameters.email || 'Oops, no email';
  const data = {
    api_key: 'hQIOi5G6xVzZBQ0hRZTfKg',
    email: email,
  };

  const subscriber = JSON.stringify(data);

  fetch('https://api.convertkit.com/v3/forms/d9d0c34d5f/subscribe', {
        method: 'post',
        body:    subscriber,
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
};
