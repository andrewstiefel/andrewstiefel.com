const fetch = require("node-fetch");
const apiKey = process.env.CONVERTKIT_API_KEY;
const apiFormURL = process.env.CONVERTKIT_NEWSLETTER_FORM;

exports.handler = async (event, context) => {
  const email = event.queryStringParameters.email || "Oops, no email";
  const data = {
    api_key: apiKey,
    email: email,
  };

  const subscriber = JSON.stringify(data);

  // Subscribe an email

  return fetch( apiFormURL, {
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
