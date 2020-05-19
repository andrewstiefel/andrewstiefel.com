exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Find email
  const params = querystring.parse(event.body);
  const email = params.email || "Oops, no email received";

  // Subscribe an email

  return {
    statusCode: 200,
    body: `Received ${email}`
  };
};
