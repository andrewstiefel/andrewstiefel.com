---
layout: page
title: RSS Feeds
description: Subscribe to feeds for specific categories and topics to get updates on the content you're most interested in.
permalink: /feeds/
---

## All Posts
- [All Posts](/feed.xml){:data-fathom="RSS subscription"} - Everything I publish

## By Category
{% assign categories = site.posts | map: "category" | compact | uniq | sort %}
{% for category in categories %}
- [{{ category | capitalize }}](/feed/{{ category }}.xml){:data-fathom="RSS subscription"}
{% endfor %}

## By Topic
{% assign all_tags = site.posts | map: "tags" | join: "," | split: "," | compact | uniq | sort %}
{% for tag in all_tags %}
- [{{ tag | replace: "-", " " | capitalize }}](/feed/topics/{{ tag }}.xml){:data-fathom="RSS subscription" class="capitalize"}
{% endfor %}

## What is RSS?

RSS (Really Simple Syndication) feeds let you subscribe to website updates without having to visit the site manually. When you subscribe to an RSS feed, new posts are automatically delivered to your feed reader app.

**Popular RSS readers:**
- [Feedly](https://feedly.com/) (Web, iOS, Android)
- [Inoreader](https://www.inoreader.com/) (Web, iOS, Android)
- [NetNewsWire](https://netnewswire.com/) (macOS, iOS)
- [Reeder](https://reederapp.com/) (macOS, iOS)

To subscribe, copy the feed URL and add it to your preferred RSS reader.
