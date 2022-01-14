---
layout: post
title: Creating a better feed experience with Atom and XSL
description:
subtitle: RSS feeds have a horrible user experience. We can fix that with XSL stylesheets.
image:
date: 2021-12-28 12:00:00 -0700
category: notes
stage: seedling
tags: [coding, jekyll]
---

Why feeds are great

A less than optimal experience

Solution: XSL

## Why Atom, and not RSS?
Great question, and one I don’t intend to answer fully here given the vast amounts of writing on this topic over the last ten years. In short, Atom is a better format. Specifically, I wanted the following:

- Support for full content payload in the feed
- RSS 2.0 is frozen and the copyright is owned by Harvard University

## First, create the feed in Jekyll

It’s important to leave the dashes, otherwise Jekyll will try to parse

{% raw %}
```xml
---
---

<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet href="/assets/css/feed.xsl" type="text/xsl"?>
<feed xmlns="http://www.w3.org/2005/Atom">

 <title>{{ site.title }}</title>
 <link href="{{ site.url }}{{ site.baseurl }}/feed.xml" rel="self"/>
 <link href="{{ site.url }}{{ site.baseurl }}/" rel="alternate"/>
 <subtitle>{{ site.description }}</subtitle>
 <updated>{{ site.time | date_to_xmlschema }}</updated>
 <id>{{ site.url }}/</id>
 <author>
   <name>{{ site.author.name }}</name>
   <email>{{ site.author.email }}</email>
 </author>
 <rights type="text">Copyright © {{ site.time | date: "%Y" }} {{ site.author }}. All rights reserved.</rights>

 {% for post in site.posts %}
 <entry>
   <title>{{ post.title }}</title>
   <link rel="alternate" href="{{ site.url }}{{ post.url }}"/>
   <updated>{{ post.date | date_to_xmlschema }}</updated>
   <id>{{ site.url }}{{ site.baseurl }}{{ post.id }}</id>
   <summary>{{ post.description }}</summary>
   <content type="html">{{ post.content | xml_escape }}</content>
 </entry>
 {% endfor %}

</feed>
```
{% endraw %}

## Create the XSL file to style the feed

{% raw %}
```html
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <title>Web Feed • <xsl:value-of select="atom:feed/atom:title"/></title>
        <style type="text/css">
          body{max-width:768px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:16px;line-height:1.5em}section{margin:30px 15px}h1{font-size:2em;margin:.67em 0;line-height:1.125em}h2{border-bottom:1px solid #eaecef;padding-bottom:.3em}.alert{background:#fff5b1;padding:4px 12px;margin:0 -12px}a{text-decoration:none}.entry h3{margin-bottom:0}.entry p{margin:4px 0}
        </style>
      </head>
      <body>
        <section>
          <div class="alert">
            <p><strong>This is a web feed</strong>, also known as an RSS feed. <strong>Subscribe</strong> by copying the URL from the address bar into your newsreader app.</p>
          </div>
        </section>
        <section>
          <xsl:apply-templates select="atom:feed" />
        </section>
        <section>
          <h2>Recent Items</h2>
          <xsl:apply-templates select="atom:feed/atom:entry" />
        </section>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="atom:feed">
    <h1><xsl:value-of select="atom:title"/>'s Web Feed Preview</h1>
    <p>This RSS feed provides the latest posts from <xsl:value-of select="atom:title"/>'s blog.

    <a class="head_link" target="_blank">
      <xsl:attribute name="href">
        <xsl:value-of select="atom:link[@rel='alternate']/@href"/>
      </xsl:attribute>
      Visit Website &#x2192;
    </a>

    </p>

    <h2>What is an RSS feed?</h2>
    <p>An RSS feed is a data format that contains the latest content from a website, blog, or podcast. You can use feeds to <strong>subscribe</strong> to websites and get the <strong>latest content in one place</strong>.</p>
    <p><strong>Feeds put you in control.</strong> Unlike social media apps, there is no algorithm deciding whether or not you see new content from your favorite creators.</p>
    <p><strong>Feeds are spam-proof.</strong> Had enough? Easy, just unsubscribe from the feed.</p>
    <p>All you need to do to get started is to add the URL (web address) for this feed to a special app called a newsreader. Visit <a href="https://aboutfeeds.com/">About Feeds</a> to get started with newsreaders and subscribing. It’s free. </p>
  </xsl:template>

  <xsl:template match="atom:entry">
    <div class="entry">
      <h3>
        <a target="_blank">
          <xsl:attribute name="href">
            <xsl:value-of select="atom:id"/>
          </xsl:attribute>
          <xsl:value-of select="atom:title"/>
        </a>
      </h3>
      <p>
        <xsl:value-of select="atom:summary"  disable-output-escaping="yes" />
      </p>
      <small>
        Published: <xsl:value-of select="atom:updated" />
      </small>
    </div>
  </xsl:template>

</xsl:stylesheet>
```
{% endraw %}

## End result

Now when you visit my XML page, you are greeted with an explanation of how to get started and a formatted recap of my latest posts.

I wrote some basic inline styles, but you could even tap into your site’s primary css file to keep the styling consistent.

You can add the url to any feed reader and it will seamlessly
