---
layout: page
title: Tags

---

<div class="page-content wc-container">
 <div class="post">
  <ul>
   {% for tag in site.tags %}
   <li><a href="{{site.baseurl}}/tag/{{ tag[0] }}">{{ tag[0] }}</a></li>
   {% endfor %}
  </ul>
 </div>
</div>
