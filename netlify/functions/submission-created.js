const { BUTTONDOWN_API_KEY } = process.env;

import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    console.log(event)
    const submission = JSON.parse(event.body)
    console.log(submission.email)
    console.log(submission.tag)

    const response = await fetch( 'https://api.buttondown.email/v1/subscribers', {
		  method: 'POST',
		  headers: {
			  Authorization: `Token ${BUTTONDOWN_API_KEY}`,
			  'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ 
        email: email,
        tags: tag
        }),
	    }
    );

    let responseText = await response.text();
    console.log('Response:', responseText);
    
    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
}