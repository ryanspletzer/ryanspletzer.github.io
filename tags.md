---
layout: listing
title: Tags
permalink: /tags/
---

{% capture tags %}
  {% for tag in site.tags %}
    {{ tag[0] }}
  {% endfor %}
{% endcapture %}
{% assign sortedtags = tags | split:' ' | sort %}

{% for tag in sortedtags %}
<h3 id="{{ tag }}">{{ tag }}</h3>
<ul>
{% for post in site.tags[tag] %}
  <li>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%B %d, %Y" }}</time>:
    <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
{% endfor %}
