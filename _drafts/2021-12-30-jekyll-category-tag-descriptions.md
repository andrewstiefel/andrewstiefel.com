---
layout: post
title: How to create Jekyll category and tag descriptions
description:
subtitle:
image:
date: 2021-12-30 12:00:00 -0700
category: notes
stage: seedling
tags: [coding, jekyll]
---

INTRO

- Creates a better user experience for tag and category pages
- Improves SEO ranking for tags and categories

## Install the Jekyll Archives Plugin
I used the Jekyll Archives plugin to generate

1. Add `gem 'jekyll-archives'` to your site's Gemfile
2. Add the following to your site's _`config.yml`:_
	plugins:
	  - jekyll-archives

## Configure the Jekyll Archives Plugin
In my case, I enabled the category and tags archives. You can also enable year, month, and day archives if that fits your site format better.

Most importantly, I specified the layouts for the category and tag layouts.

```yaml
jekyll-archives:
  enabled:
    - categories
    - tags
  layouts:
    category: category-archive
    tag: tag-archive
  permalinks:
```

## Create category and tag templates
Basic example below

{% raw %}
```html
<h1>{{ page.title }}</h1>
<ul class="posts">
  {% for post in page.posts %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
```
{% endraw %}

Save these under `_layouts`.

## Create data files

Create a new folder labeled `_data`.

In this folder, create two files: one for tags and one for categories. I labeled them `metatag.yml` and `metacat.yml` in my examples.

Add a key for the tag or category and a description. You could also add an image link or any other relevant info you want to customize for each page.

Here is a brief example for a #Jekyll tag:

```yaml
jekyll:
  description: Jekyll is a simple, blog-aware, static site generator. Think of it like a file-based CMS, without all the complexity.
```

## Pull data into templates

Now we’ll update our templates to pull in this information. The Jekyll Archives plugin provides a `page.title` query we can use to match our tag or category to the data in our `_data` director.

A little bit of liquid templating language enables us to access specific information:

{% raw %}
```html
<h1>{{ page.title }}</h1>
{% assign meta = site.data.metacat[page.title] %}
<p>{{ meta.description }}</p>
```
{% endraw %}

## Wrap up

Goes here
