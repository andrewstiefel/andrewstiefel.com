---
layout: post
title: Build an Email Subscription Form with Netlify Functions
description: Learn how to use Netlify Functions and ConvertKit to create a custom newsletter subscription form for your website.
image:
date: 2022-08-28
category: Notes
tags: [Coding, Netlify, Jekyll]
---

I enjoy the process of building and maintaining my own personal website. It’s a great way to experiment with different technologies, and have fun learning new tools and concepts along the way.

This time, I wanted to learn how to use [serverless functions](https://www.netlify.com/blog/intro-to-serverless-functions/ "Intro to Serverless Functions – Netlify"). There are a lot of great resources out there already. But I had trouble finding a guide that adequately addressed my use case: a humble email subscription form.

This tutorial is strongly inspired by an [excellent guide created by Matthew Ström](https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget/ "CSS-Tricks"). I’ve added solutions for some of the problems I encountered while following his guide, but Matthew deserves the credit.

## The Challenge: Build a Mailing List Sign Up Form
After going through all the work to build my personal website, the last thing I wanted to do was slap a pre-designed newsletter subscription form on it. 

I wanted the flexibility to design my own custom forms for a few reasons:

- **Better design:** Email marketing providers offer great default forms, but they never perfectly match a site’s design
- **Better Performance:** External email forms require additional calls for CSS and Javascript, and they sometimes get blocked by privacy settings
- **Better privacy:** Hosted email forms can collect additional information about users, like their IP address

I set out a few rules for this challenge:

- It should work without extra JavaScript or AJAX
- It must use [Netlify functions](https://docs.netlify.com/functions/overview/ "Netlify Functions Overview")
- It shouldn’t need external dependencies

## The Team: Jekyll, Netlify, and ConvertKit
My website is built using a static site generator called [Jekyll](https://jekyllrb.com/ "Jekyll"). It allows me to build my own templates and components, so I’ll use it to build my email form. I also used [Tailwind CSS Forms Plugin](https://github.com/tailwindlabs/tailwindcss-forms "Github – Tailwind CSS Forms") to simplify the design process.

I use a service called [Netlify](https://www.netlify.com/ "Netlify") to deploy my website. It’s key for this project, because it complies the static assets built by Jekyll and runs the serverless function to send emails to my email list provider.

Finally, I’m using [ConvertKit](https://convertkit.com/ "ConvertKit") as my email list provider. I’ve also included information on how to use [Buttondown](https://buttondown.email "Buttondown") and [SendStack](https://getsendstack.com/ "SendStack") in this tutorial, but the basic principles of the function should apply to any other email providers that offers an API.

Ok, let’s get started!

## Create the serverless function
You need to follow three basic steps to create a Netlify function:

1. Add API tokens to Netlify as environment variables via the admin interface
2. Tells Netlify where to look for your functions using the netlify.toml file 3. Write the function in a Javascript file in your project
3. Write the function as a Javascript file in your project

To start, let’s save the API token from our email service as an **environment variable**. Environment variables are useful to hold information that I don’t want to make public, like this API key. You can add an environment variable using the Netlify admin interface under your build and deploy settings.

![Netlify Environment Variables](/assets/images/netlify-environment-variables.png){:height="291px" width="700px"}

Next, specify where Netlify should look for your functions. Edit your netlify.toml to specify the functions directory. It might look something like this:

```yaml
[build]
	base = "."

[functions]
  directory = "netlify/functions/"
```

Create a function file in the directory you specified above. If you used the default functions directory, you should save your function at`YOUR_BASE_DIRECTORY/netlify/functions`.

Next, you’ll need to give your function a name. For example, to create a function with an endpoint name of `hello-world`, save the function in one of these locations:

- `netlify/functions/hello-world.js`
- `netlify/functions/hello-world/hello-world.js`
- `netlify/functions/hello-world/index.js`

Now you’re ready to start writing the function. Start by importing the API key you created earlier as an environment variable:

```js
const { EMAIL_TOKEN } = process.env
```

On line 2, I add a small library called `node-fetch`. This allows me to use Javascript’s Fetch API, which is how we’ll format an API POST request to send data to our email service.

```js
import fetch from 'node-fetch';
```

NOTE: When I was writing this post, many of the tutorials available used the `require` method to import the Fetch API which resulted in errors when I tried to deploy the function. Make sure you use the method I described above.

Next create a synchronous function on line 4. The `exports.handler` value is where Netlify expects to find the function, so I define it there. The basic syntax to create the function is provided below:

```js
exports.handler = async function (event, context) {
  // your server-side functionality
};
```

Next retrieve the email from the event value using `JSON.parse`:

```js
const email = event.queryStringParameters.email
```

Then log the data in the console for debugging:

```js
console.log(`Received a submission: ${email}`)
```

After retrieving the email address from the event value using `JSON.parse`, I’m ready to send it off my email marketing providers. I’ll use the `node-fetch` library I imported earlier to form the POST request. 

I’ve outlined code examples for a few services below, but make sure you consult the API documentation from your email provider to make sure the API request is properly format.

#### ConvertKit Subscription Form
Using ConvertKit as an example, send a POST request to `https://api.convertkit.com/v3/forms/<YOUR_FORM_ID/subscribe`. 

To find the form ID, navigate to **Grow \> Landing Pages & Forms**, select the form you want to use, and copy the ID number from the url:

```js
https://app.convertkit.com/forms/designers/<YOUR_FORM_ID>/edit
```

The body of the POST request contains the email token and the email address from the form submission:

```js
const response = await fetch( 'https://api.convertkit.com/v3/forms/<YOUR_FORM_ID/subscribe', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ 
			api_key: EMAIL_TOKEN,
			email: email
		}),
	}
);
```

#### Buttondown Subscription Form
Buttondown’s API sends the authorization in the headers rather than the body, so you’ll need to adapt the code slightly:

```js
const response = await fetch( 'https://api.buttondown.email/v1/subscribers', {
		method: 'POST',
		headers: {
			Authorization: `Token ${EMAIL_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	}
);
```

#### SendStack Subscription Form
SendStack is a new privacy-first email service. Unlike Buttondown and ConvertKit, they offer API access on their free plan. There is currently a waiting list, but if you have access, you can try it out using the code below.

Add the email token to the headers and the email address to the body of the POST request:

```js
const response = await fetch( 'https://getsendstack.com/api/subscribers', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${EMAIL_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	}
);
```

Then capture and log the response from the email service. We do this to diagnose any issues that happened. Netlify makes it easy to check your function’s logs, so use console.log often!

```js
let responseText = await response.text();
console.log('Response:', responseText);
```

Finally, redirect the form to a confirmation page that tells subscribers to check their emails to confirm their subscription. Use a simple return to redirect the browser to the new page:

```js
return {
	statusCode: 302,
	headers: {
    	'Location': '/confirmation/,
	},
}
```

You can find the completed function below. In this case I used ConvertKit:

```js
const { EMAIL_TOKEN } = process.env;
import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    const email = event.queryStringParameters.email || "No email";
    console.log(`Received a submission: ${email}`)

    const response = await fetch(
        'https://api.convertkit.com/v3/forms/{YOUR_FORM-ID}/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                api_key: EMAIL_TOKEN,
                email: email
             }),
        }
    );
    let responseText = await response.text();
    console.log('response:', responseText);
    return {
        statusCode: 302,
        headers: {
            'Location': '/confirmation/',
        },
    }
}
```

## Create the email subscription form
Now that you’ve built the function, let’s call it from the email subscription form. The HTML for the email subscription form is very minimal. All you need to do is call the function using the form action:

```html
<form name="newsletter" method="POST" action="/.netlify/functions/subscribe-email">
	<label for="email">Your Email Address</label>
	<input type="email" name="email" placeholder=Email Address"/>
	<button type="submit">Subscribe</button>
</form>
```

Make sure you specific input name (“email”) and make sure it matches the information you parse from the event value using `JSON.parse`.

## Deploy the function
Now that I’ve written my function, configured my netlify.toml file, and added my environment variables, everything is ready to go. Deploying is painless: just set up Netlify’s GitHub integration, and your function will be deployed when your project is pushed.

## Conclusion
It took less than 50 lines of code to create my own email subscription form including custom HTML and a serverless function to add new emails to my list. I wrote it all in HTML, CSS, and JavaScript, and everything is served from my domain. Plus, my website visitors get a nice experience whether they have JavaScript enabled or not, and it will still serve even if they have advanced privacy protection enabled.