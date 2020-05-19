exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const email = event.queryStringParameters.email || 'Oops, no email';

  // Subscribe an email

  return {
    statusCode: 200,
    body: `Received ${email}`
  };
};
