---
layout: page
title: Elsewhere
description: Articles, blog posts, and conference talks I've published or presented 
permalink: /elsewhere/
---

{% if site.data.elsewhere %}
{% if site.data.elsewhere.talks and site.data.elsewhere.talks.size > 0 %}
## Talks
{: .mt-0 }
<ul class="list-disc">
{% for talk in site.data.elsewhere.talks %}
    <li class="leading-8">{{ talk.title }}</li>
 {% if forloop.last %}
 </ul>
{% endif %}
{% endfor %}
{% endif %}

{% if site.data.elsewhere.articles and site.data.elsewhere.articles.size > 0 %}
## Articles 
<ul class="list-disc">
{% for article in site.data.elsewhere.articles %}
    <li class="leading-8"><a class="underline" target="_blank" rel="noopener noreferrer" href="{{ article.url }}">{{ article.title }}</a></li>
 {% if forloop.last %}
 </ul>
{% endif %}
{% endfor %}
{% endif %}

{% if site.data.elsewhere.posts and site.data.elsewhere.posts.size > 0 %}
## Posts
<ul class="list-disc">
{% for post in site.data.elsewhere.posts %}
<li class="leading-8"><a class="underline" target="_blank" rel="noopener noreferrer" href="{{ post.url }}">{{ post.title }}</a></li>
 {% if forloop.last %}
 </ul>
 {% endif %}
 {% endfor %}
 {% endif %}
 {% endif %}