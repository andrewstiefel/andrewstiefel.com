const fetch = require("node-fetch");
const apiKey = process.env.CONVERTKIT_API_KEY;

exports.handler = async (event, context) => {
  const email = event.queryStringParameters.email || "Oops, no email";
  const data = {
    api_key: apiKey,
    email: email,
  };

  const subscriber = JSON.stringify(data);

  // Subscribe an email

  return fetch( 'https://api.convertkit.com/v3/forms//3384627/subscribe', {
    method: "post",
    body: subscriber,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .then(() => ({
      statusCode: 301,
      headers: {
        Location: "/almost",
      },
    }))
    .catch((error) => {
      console.error("Error:", error);
    });
};