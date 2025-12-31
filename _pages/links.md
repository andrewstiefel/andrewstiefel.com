---
layout: page
title: Links
description: A curated collection of interesting articles, tools, and resources
permalink: /links/
---

{% if site.data.shared_links and site.data.shared_links.size > 0 %}
  <div class="space-y-8 mt-8 font-sans text-base">
    {% for link in site.data.shared_links %}
      <div class="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-b-0">
        <div class="mb-3">
          <h2 class="text-2xl font-serif">
            <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer" class="text-black dark:text-gray-100 no-underline">
              {{ link.title }}
            </a>
          </h2>
         </div>
         {% if link.description %}
           <div class="text-gray-600 dark:text-gray-400 my-2 line-clamp-2">
             {{ link.description }}
           </div>
         {% endif %}
		 {% if link.date %}
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <time datetime="{{ link.date | date_to_xmlschema }}">
                {{ link.date | date: "%-d %b %Y" }}
              </time>
              •
              <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer" class="hover:text-gray-700 dark:hover:text-gray-200">
                {{ link.url | remove: 'https://' | remove: 'http://' | split: '/' | first }}
              </a>
            </div>
          {% endif %}
      </div>
    {% endfor %}
  </div>
{% else %}
  <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <p class="text-gray-600 dark:text-gray-400">
      No shared links available at the moment. Check back later or subscribe to the 
      <a href="https://links.andrewstiefel.net/feeds/shared" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">RSS feed</a> 
      for updates.
    </p>
  </div>
{% endif %}
