---
layout: page
title: Elsewhere
description: Articles and blog posts I've written for other publications
permalink: /elsewhere/
---

{% if site.data.elsewhere %}
{% if site.data.elsewhere.articles and site.data.elsewhere.articles.size > 0 %}
<div class="mb-12">
  <div class="flex justify-start mb-6">
    <div class="text-sm uppercase w-60">Articles</div>
    <div class="w-full">
      <span class="inline-block w-full h-px mb-1 bg-gray-200 dark:bg-gray-800"></span>
    </div>
  </div>
  
  <div class="space-y-8">
    {% for article in site.data.elsewhere.articles %}
    <div class="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-b-0">
      <div class="mb-3">
        <h2 class="text-2xl leading-tight mb-2">
          <a href="{{ article.url }}" target="_blank" rel="noopener noreferrer" class="text-black dark:text-gray-100 no-underline hover:text-primary dark:hover:text-primary">
            {{ article.title }}
          </a>
        </h2>
        {% if article.date or article.publication %}
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {% if article.date %}
          <time datetime="{{ article.date | date_to_xmlschema }}">
            {{ article.date | date: "%-d %b %Y" }}
          </time>
          {% endif %}
          {% if article.date and article.publication %} • {% endif %}
          {% if article.publication %}
          <span class="font-medium">{{ article.publication }}</span>
          {% endif %}
        </div>
        {% endif %}
      </div>
      {% if article.description %}
      <div class="text-gray-700 dark:text-gray-300 leading-relaxed">
        {{ article.description }}
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</div>
{% endif %}

{% if site.data.elsewhere.blog_posts and site.data.elsewhere.blog_posts.size > 0 %}
<div class="mb-12">
  <div class="flex justify-start mb-6">
    <div class="text-sm uppercase w-60">Blog Posts</div>
    <div class="w-full">
      <span class="inline-block w-full h-px mb-1 bg-gray-200 dark:bg-gray-800"></span>
    </div>
  </div>
  
  <div class="space-y-8">
    {% for post in site.data.elsewhere.blog_posts %}
    <div class="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-b-0">
      <div class="mb-3">
        <h2 class="text-2xl leading-tight mb-2">
          <a href="{{ post.url }}" target="_blank" rel="noopener noreferrer" class="text-black dark:text-gray-100 no-underline hover:text-primary dark:hover:text-primary">
            {{ post.title }}
          </a>
        </h2>
        {% if post.date or post.publication %}
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {% if post.date %}
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%-d %b %Y" }}
          </time>
          {% endif %}
          {% if post.date and post.publication %} • {% endif %}
          {% if post.publication %}
          <span class="font-medium">{{ post.publication }}</span>
          {% endif %}
        </div>
        {% endif %}
      </div>
      {% if post.description %}
      <div class="text-gray-700 dark:text-gray-300 leading-relaxed">
        {{ post.description }}
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</div>
{% endif %}

{% else %}
<div class="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
  <p class="text-gray-600 dark:text-gray-400">
    No external publications available at the moment. Check back later!
  </p>
</div>
{% endif %}