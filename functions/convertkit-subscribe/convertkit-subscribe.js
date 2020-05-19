const request = require("request");

exports.handler = async (event, context) => {

  const email = event.queryStringParameters.email || 'Oops, no email';
  const data = {
    api_key: 'hQIOi5G6xVzZBQ0hRZTfKg',
    email: '${email}',
  };

  const subscriber = JSON.stringify(data);

  return {
    statusCode: 200,
    body: `${subscriber}`
  };
};
