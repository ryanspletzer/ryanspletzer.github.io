---
layout: page
title: Blog archive
permalink: /archive/
---
<div class="page-content wc-container">
 <div class="post">
  {% for post in site.posts %}
  {% capture currentyear %}{{post.date | date: "%Y"}}{% endcapture %}
  {% if currentyear != year %}
  {% unless forloop.first %}</ul>{% endunless %}
  <h5>{{ currentyear }}</h5>
  <ul class="posts">
   {% capture year %}{{currentyear}}{% endcapture %}
   {% endif %}
   <li>
      <time>{{ post.date | date: "%B %d, %Y" }}</time>:
      <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
   </li>
   {% endfor %}
