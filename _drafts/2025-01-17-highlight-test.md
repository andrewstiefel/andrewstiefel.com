---
layout: post
title: Rouge Highlighter Test
description: 
image:
date: 2025-01-17
category: Article
tags: [Jekyll]
---

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