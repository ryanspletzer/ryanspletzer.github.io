---
layout: page
title: Tags
permalink: tags.html
---

{% capture tags %}
  {% for tag in site.tags %}
    {{ tag[0] }}
  {% endfor %}
{% endcapture %}
{% assign sortedtags = tags | split:' ' | sort %}

<div class="page-content wc-container">
 <div class="post">
    {% for tag in sortedtags %}
    <h3 id="{{ tag }}">{{ tag }}</h3>
    <ul>
    {% for post in site.tags[tag] %}
        <li>
            <time>{{ post.date | date: "%B %d, %Y" }}</time>:
            <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
    </ul>
    {% endfor %}
 </div>
</div>
