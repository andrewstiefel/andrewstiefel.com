---
layout: post
title: How I Built My Blog with Jekyll and Netlify
description: I used Jekyll and Netlify to build a custom personal website and blog.
subtitle: I used Jekyll and Netlify to build a fully custom personal website and blog.
date: 2021-12-20 12:00:00 -0700
category: essays
stage: budding
tags: [coding, blogging, jekyll, netlify]
---

I’ve been blogging and hosting my website since 2006, but I’ve always been unhappy with the themes available for technologies like Blogger, WordPress, or Squarespace. I usually had a vision for what I wanted to create and would spend hours scouring marketplaces to find something that came close.

At first, I experimented with developing child themes for WordPress. If you’re not familiar with WordPress, I basically overwrote the CSS stylesheets and built my own page and post templates using PHP. I even got good enough that I had clients who would hire me to make changes to their WordPress themes and installations.

Still, all of the tweaks and changes felt cobbled together. They _were_ cobbled together. I was building Frankenstein sites with dozens of overrides, plugins, and hacks that could break at any moment.

## Searching for something better

I wanted to escape the bloat of platforms like WordPress, or the restricted design options available with a platform like Squarespace. **I wanted to go back to static HTML and CSS and I wanted to code it myself.**

After reading online, I came across [Jekyll][1]{:target="_blank" rel="noopener noreferrer"}. It’s an open-source [static site generator][2]{:target="_blank" rel="noopener noreferrer"}. That means it complies basic text files into static HTML so you don’t have to code every page by hand.

I built a few starter projects with Jekyll and quickly fell in love with it. While there are a variety of open-source static site generators available now, I still enjoy the relative simplicity of Jekyll for getting started. The liquid templating language is easy to understand and your HTML/CSS/JS work cleanly together.

Jekyll may not be the sleekest option — there are good reasons to pick something like [Gatsby][3]{:target="_blank" rel="noopener noreferrer"} or [Next.js][4]{:target="_blank" rel="noopener noreferrer"} if you work with javascript and react — I still think it is the most approachable option for beginners (like me).

## To use a CMS or not?

I built a few starter websites with Jekyll. One of the things I missed at first was the integration with my writing tool of choice ([Ulysses][5]{:target="_blank" rel="noopener noreferrer"}). I also wanted some of the benefits of a CMS, like scheduling posts. Ulysses integrates with WordPress and [Ghost][6]{:target="_blank" rel="noopener noreferrer"} so you can publish from mobile and desktop. I decided to give Ghost a try.

As a CMS, I did love Ghost. It’s simple and focused on the writing experience. They have even embraced the [Jamstack][7]{:target="_blank" rel="noopener noreferrer"} (Javascript, APIs, and markup) movement driving static websites and supporting headless designs. I also liked the idea of keeping my content separate from the frontend framework.

I worked with Ghost for a while but kept getting frustrated with the server upkeep that it invariable entailed. At first, I paid for a monthly subscription, but the functionality at the basic level is limited unless you spend $30/mo. At that level, you can either create your own theme to host with them or use their API to support a frontend framework built with Jekyll, Gatsby, or another tool. The cost is about the same as a good WordPress hosting provider, but that was more than I was willing to spend for the convenience of scheduling posts within a CMS.

I should note that Ghost also offers an option to self-host ([starting at $5/mo through Digital Ocean][8]{:target="_blank" rel="noopener noreferrer"}) but I didn’t want to maintain the server myself. I already have enough reasons to not write without throwing in server updates…which were one of the reasons I wanted to leave WordPress.

Ultimately, I decided to forgo the CMS and focus on Jekyll. I’ll write more about this in the future, but Jekyll fits into my growing philosophy around working with markdown for personal knowledge management and publishing.

## Publishing with Netlify

My first Jekyll website was published using Github pages. While I loved the option to publish a free project website directly from my repo, it was definitely more difficult to manage and came with a host of limitations.

Ultimately, I went with Netlify. They are a fantastic organization that makes it easy to build, deploy, and scale web projects. Using Jekyll, I can generate a website from my repo on Github and Netlify deploys it to edge servers across its network. Since I’m only serving static HTML files, this makes my websites incredibly fast for readers. And there is no server (on my end) to worry about securing, protecting, etc. Netlify handles the build and deploys the static files acrss the edge.

## Getting set up

I won’t go into too much detail on the development process here, but I will link to the resources that I found the most helpful for getting started:

* [Poole: ][9]{:target="_blank" rel="noopener noreferrer"}Clean and concise foundational setup for Jekyll
* [How to deploy Jekyll with Netlify][10]{:target="_blank" rel="noopener noreferrer"}
* [How to deploy Jekyll with GitHub pages][11]{:target="_blank" rel="noopener noreferrer"}
* [Formspree:][12]{:target="_blank" rel="noopener noreferrer"} Open-source form solution for static websites
* [Liquid template language reference][13]{:target="_blank" rel="noopener noreferrer"} from Shopify
* [Getting started with Netlify][14]{:target="_blank" rel="noopener noreferrer"}

As one of the original static website generators, Jekyll benefits from a large community of open-source contributors and users who have documented their techniques and solutions. If you get stuck, there is most likely a tutorial with the answers you need!

## What’s next

Overall I’m pretty happy with the results of the project. I learned a lot along the way and ended up with a website that doesn’t look too bad and is unique to me. While I don’t need to make any changes to start writing, there are a few areas I plan to explore in the coming months:

**Implement Tailwind CSS to replace Bulma**
I used the [Bulma CSS Framework][15]{:target="_blank" rel="noopener noreferrer"} to scaffold the development of this project. Previously, I used Bootstrap for a few starter projects. Bulma is great, but I’ve been wanting something easier to customize. Enter [Tailwind CSS][16]{:target="_blank" rel="noopener noreferrer"}, which is a just-in-time, atomic framework for creating CSS. I can build and design the website, all within HTML. Then, I can filter out any unused classes, resulting in a very small file.

**Buildout functionality for my digital garden**
I expect to write about this more in the coming months, but I’m planning to treat this blog more like [a digital garden][17]{:target="_blank" rel="noopener noreferrer"}. There are some core functionalities I want to add, like sides notes, bi-directional links, and search, to make the reading experience more rich and interconnected.

**Rebuild the site with Gatsby, Next, or another framework**
I really like Jekyll, so this one isn’t urgent. But I’m starting to see how javascript frameworks like Gatsby, Next, or Vue could enable some new capabilities. One function that stands out to me is the ability to import markdown (my blog posts) from a separate Github repository. This way my thinking and writing could truly exist separately (and under version control!) from the frontend visual design.

I hope you have a similar positive experience, and please reach out if you have any questions about building your website with Jekyll and Netlify.

[1]:	https://jekyllrb.com/ "Jekyll"
[2]:	https://www.cloudflare.com/learning/performance/static-site-generator/ "What is a static site generator?"
[3]:	https://www.gatsbyjs.com/ "Gatsby JS"
[4]:	https://nextjs.org/ "Next JS"
[5]:	https://ulysses.app/ "Ulysses App"
[6]:	https://ghost.org/ "Ghost"
[7]:	https://jamstack.org/what-is-jamstack/ "Jamstack"
[8]:	https://marketplace.digitalocean.com/apps/ghost "Ghost App on Digital Ocean"
[9]:	https://getpoole.com/ "Poole"
[10]:	https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-4.0-on-netlify/ "Netlify"
[11]:	https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll "Github"
[12]:	https://formspree.io/ "Formspree"
[13]:	https://shopify.github.io/liquid/ "Shopify on GitHub"
[14]:	https://docs.netlify.com/ "Netlify Docs"
[15]:	https://bulma.io/ "Bulma Docs"
[16]:	https://tailwindcss.com/
[17]:	https://maggieappleton.com/garden-history "A Brief History of the Digital Garden"
