exports.handler = async (event, context) => {
  const formData = JSON.parse(event.body);
  const email = formData.email;
  let errorMessage = null;

  if (!formData) {
    errorMessage = "No form data supplied";
    console.log(errorMessage);
    callback(errorMessage);
  }

  if (!email) {
    errorMessage = "No EMAIL supplied";
    console.log(errorMessage);
    callback(errorMessage);
  }

  const data = {
    api_key: hQIOi5G6xVzZBQ0hRZTfKg,
    email: email,
    tags: [newsletter],
  };

  const subscriber = JSON.stringify(data);
  console.log("Sending data to convertkit", subscriber);

  request({
    method: "POST",
    url: "https://api.convertkit.com/v3/forms/d9d0c34d5f/subscribe",
    body: subscriber,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
