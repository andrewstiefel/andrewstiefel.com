---
layout: post
title: How to Style an Atom Feed with XSLT
description: Create a seamless user experience for your Atom or RSS feed with XLST stylesheets.
subtitle: Create a seamless user experience for your Atom or RSS feed with XLST stylesheets.
image:
date: 2022-01-24 10:00:00 -0700
category: notes
stage: evergreen
tags: [coding, jekyll]
---

Maybe it’s nostalgia for the early web, but I love web feeds as a tool for following and reading content. Feeds are privacy-first and put the reader in control: you can opt-out any time, choose your tool for reading, and organize them in any way you want.

But the UX experience is terrible.

Web feeds are meant to be machine readable, so most users follow a link to an RSS or Atom feed and end up looking at something like this:

![Raw RSS or Atom][image-1]

This doesn't have to be the case. RSS and Atom feeds can be human-readable with a little extra work. Here's an example from my website. It’s simple and clean and provides some essential instructions on how to get started:

![Human-readable Atom or RSS Feed][image-2]

Let’s explore how to implement this with Atom and an XSLT stylesheet.

## Why Atom, and not RSS?

Great question, and one I don’t intend to answer fully here given the vast amounts of writing on this topic already. In short, Atom is a better format.

Specifically, I wanted the following:

- Support for a full content payload in the feed
- Wide support across feed readers
- Extensibility and future-proof format

## First, create the feed in Jekyll

_If you’re using a different tech stack to create your website, you can [skip this section][1] and jump ahead to the part about creating an XSLT stylesheet._

You can either use the excellent [Jekyll Feed plugin][2]{:target="_blank" rel="noopener noreferrer"}, or create your own template using liquid tags and save it in your project as `feed.xml`.

I chose to create my own template so I could incorporate some additional markup. You can see my version below:

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

**Note on YAML Front Matter block:** It’s important to leave the dashes at the top of the file. This is necessary because Jekyll will not process a page with Liquid unless there is a YAML block at the top of the file.

**Enable auto-discovery:** Make sure you add the appropriate meta tag to support automated discovery of your feed. Place the following code somewhere in your template's `<head>` section to output the necessary metadata:

{% raw %}
```html
<link type="application/atom+xml" rel="alternate" href="{{ site.url }}/feed.xml" title="{{ site.title }}" />
```
{% endraw %}

## Create the XSL file to style the feed

[We can use XSLT to style our XML][3]{:target="_blank" rel="noopener noreferrer"}. This makes our feeds more human-readable while supporting bots, aggregators, and search engines.

You’ll notice some similarities to HTML and CSS in the example below, but with a few semantic changes and special attributes.

First of all, you can place your CSS in the `<style>` tag like normal. You can also use some standard HTML markup like the `<body>`, `<section>`, `<p>`, and `<h1>` tags.

There are a few special elements you can use, like `<xsl:apply-templates>` or `<xsl:value-of>`. I won’t cover these in detail during this tutorial, but W3Schools maintains [a great XSLT reference][4] if you want to learn about all these special elements.

Here is the example from my website:

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

I wrote some basic CSS styles to format it, but you could even tap into your site’s primary CSS file to keep the styling consistent.

Save your file as `feed.xsl` and add the tag below to your XML file. Make sure the href tag points to the correct location and file name for your website.

```xml
<?xml-stylesheet href="/feed.xsl" type="text/xsl"?>
```

## Conclusion

With a little extra care and attention, we can improve the experience of using RSS and Atom feeds across the web. Now when you visit my feed, you are greeted with an explanation of how to get started and a formatted recap of my latest posts.

I made my own XML template and XSLT stylesheet based on the examples above. You can [see it in action here][5]{:target="_blank"} or [download a version][6]{:target="_blank" rel="noopener noreferrer"} to adapt for your website.

Thanks for reading!

## Additional Reading
* [How would I improve RSS? Three ideas (Interconnected by Matt Webb)][7]{:target="_blank" rel="noopener noreferrer"}
* [How to style an RSS feed (Just Lepture)][8]{:target="_blank" rel="noopener noreferrer"}
* [Styling an RSS Feed with XSLT (Nat Clark)][9]{:target="_blank" rel="noopener noreferrer"}
* [About Feeds][10]{:target="_blank" rel="noopener noreferrer"}

[1]:	#create-the-xsl-file-to-style-the-feed
[2]:	https://github.com/jekyll/jekyll-feed "Jekyll Feed"
[3]:	https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms759096%28v=vs.85%29 "What Is XSLT?"
[4]:	https://www.w3schools.com/xml/xsl_elementref.asp "XSLT Reference"
[5]:	https://andrewstiefel.com/feed.xml "Andrew Stiefel's Feed"
[6]:	https://gist.github.com/andrewstiefel/57a0a400aa2deb6c9fe18c6da4e16e0f "Github Gist"
[7]:	https://interconnected.org/home/2020/07/29/improving_rss "Interconnected by Matt Webb"
[8]:	https://lepture.com/en/2019/rss-style-with-xsl "Just Lepture"
[9]:	https://natclark.com/tutorials/xslt-style-rss-feed/ "Nat Clark"
[10]:	https://aboutfeeds.com/ "About Feeds"

[image-1]:	/assets/uploads/raw-atom-rss.png
[image-2]:	/assets/uploads/human-readable-atom-feed.png
