exports.handler = async (event, context) => {
    const email = event.queryStringParameters.email || "No email";
  
    return {
      statusCode: 200,
      body: `Hello, ${email}`,
    };
  };