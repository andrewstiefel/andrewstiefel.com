---
layout: post
title: How to Host Your Own Private Website Analytics
description: Create a simple, self-hosted website analytics solution with Fathom and DigitalOcean.
subtitle: Create a simple, self-hosted website analytics solution with Fathom Analytics and DigitalOcean.
image: /assets/images/custom-website-analytics.jpg
date: 2020-05-02 15:00:00 -0700
category: code
tags:
---

I’ve been searching for an alternative to Google Analytics for some time. Although Google provides a great, feel tool for understanding how users interact with your website, their near-monopoly — and presence on the majority of the open web — feels a little like an invasion of privacy.

Because Google is an advertising company, they are in the business of collecting information about the users on your website. That’s not inherently wrong and they arguably provide some useful and valuable services in exchange for your browsing history. It’s just that we invite all sorts of brands into our homes, but most don’t follow you around from the store to your local coffee shop and your friend’s house.

There are many great privacy-first analytics solutions available that can provide you similar information about how users interact with your website for a modest fee. But you are ultimately still paying someone else to handle the data.

So why would you want to host your analytics?

First, the analytics tracking code will come from your own domain. That means ad tracking blockers will be less likely to prevent it from loading. Yes, tracking blockers and private analytics solutions _should_ be on the same team, but, at least for now, most ad blockers indiscriminately block javascript served across multiple websites.

Finally, you’ll own all your data. You won’t be dependent on a small company existing indefinitely into the future and your users can trust that you are providing them with a private browsing experience.

Personally, I wanted the challenge of hosting an analytics solution. It also made the most fiscal sense for a small personal website with hundreds of views rather than hundreds of thousands. Most private analytics solutions start around $15 per month. That’s incredibly reasonable, but more than I’m willing to pay simply to satisfy my curiosity about what’s happening on my website.

After trying a few options, my favorite was a self-hosted version of Fathom Analytics. It's a simple analytics solution that tells you what's happening on your website without compromising your user's privacy. Plus, with hosting costs of about $5 per month through DigitalOcoean, it’s a budget-friendly solution for small websites.

Ready to try hosting a private analytics solution? Let’s get started.

### Create a virtual server with DigitalOcean

There are many solutions for creating a virtual machine. I’m going to use DigitalOcean, in part because it is so easy to get started, especially for someone who might not be familiar with running a server.

[Use the one-click solution from the DigitalOcean Marketplace to create your server](https://do.co/2sUXaB9). (DigitalOcean calls them “droplets,” if you’re wondering.)

For a small personal blog or portfolio website, I’d recommend choosing the smallest plan at $5. You can always upgrade later if you need more resources.

Select the location of your server, choose a name, and decide how you want to login. SSH is the most secure, but for new users, the one-time password might be the easiest option.

Now you’re up and running Fathom Analytics! It’s time to configure the application.

### Create your custom domain

This step is important to create an SSL certificate later on. Refer to your DNS provider for instructions, but you will need to add an A record pointing to your newly created server. It should look something like this:

	analytics.your-domain.com 1800 IN A your_droplet_ip_address

I’ll keep using analytics.your-domain.com through the rest of this tutorial.

### Log in to your virtual machine

After creating your server, log in either using the console access provided by DigitalOcean or with the SSH keys you created. If you aren’t familiar with SSH, start by using the console, available from the right side of the droplet settings.

If you’re using SSH, you’ll need to provide your login, usually `ssh root@your_droplet_ip_address`, and your root password. If it’s your first time logging in — or, like me, you often forget your password — you may want to use the access menu (right side of the page) to reset the password and get a new one emailed to you.

If you selected the one-time password, you’ll log in using `root` as your login name and the password DigitalOcean emailed you. You will be asked to create a new password after logging into your droplet through the console.

Once you’ve logged in for the first time, you will be walked through the setup for Fathom Analytics.

### Configure Fathom and add your custom domain

The one-click Fathom Analytics will walk you through the steps. Essentially, you’ll let it know the following:

**1) Will you be pointing a domain at this Fathom instance?**

Type `yes` and it will take you to the next question.

**2) Please enter the domain or subdomain you want to use for Fathom (without protocol) (e.g. stats.yourwebsite.com).**

Enter your domain, `analytics.your-domain.com`, hit enter, and it will advance to the next question. Make sure you leave out any protocols like `http://`, `https://`, and `www`.

**3) Do you want to password protect your stats?**

This is up to you, but let’s say yes for maximum privacy. Type `yes` and hit enter to advance to the next step.

**4) Create an email address for the Fathom User**

Enter the email address you want to use to log in, `you@example.com`, press enter, and it will advance to the next step.

Take note of the long password that Fathom generates for you. You’ll need this to move on to the next step.

### Add the analytics code to your website

If you configured everything correctly, you should now be able to access the Fathom Analytics dashboard from your custom domain, `analytics.your-domain.com`. Enter your email and password to get started.

When you log in to Fathom for the first time, it will prompt you to create a new website to track. Add your primary domain, hit enter, and Fathom will provide you with a snippet of javascript for your website.

Finally, add the script to your website, usually in the head section, or with the rest of your javascript just before the final `</body>` tag.

That's it! 👏

You now own all your data with an instance of Fathom Analytics. You can add as many sites as you want and it’s still only $5 per month.

If you want additional features — or would prefer to skip managing a server — you might give the Fathom Analytics hosted solution a try. It includes some extra features like goal completions and cookie-free tracking. (The free version uses an anonymous cookie.)

Good luck and enjoy your new private analytics solution!
