exports.handler = async (event, context) => {

  const email = event.queryStringParameters.email || 'Oops, no email';

  // Subscribe an email

  return {
    statusCode: 200,
    body: `Received ${email}`
  };
};
