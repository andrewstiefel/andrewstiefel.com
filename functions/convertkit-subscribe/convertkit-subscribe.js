const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const email = event.queryStringParameters.email || "Oops, no email";
  const data = {
    api_key: "hQIOi5G6xVzZBQ0hRZTfKg",
    email: email,
  };

  const subscriber = JSON.stringify(data);

  // Subscribe an email

  fetch("https://api.convertkit.com/v3/forms/1369284/subscribe", {
    method: "post",
    body: subscriber,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // Redirect the page

  const response = {
    statusCode: 301,
    headers: {
      Location: "/almost",
    },
  };

  return response;
};
