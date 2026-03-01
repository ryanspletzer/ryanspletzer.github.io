---
layout: post
title: Filename Label Demo
date: 2026-03-01 12:00:00
description: >
  Testing .filename label styling
tags:
 - demo
---

Here's a code block with a filename label:

<p class="filename">src/utils/helpers.js</p>

```javascript
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
```

And another one:

<p class="filename">_sass/variables.scss</p>

```scss
:root {
  --color-accent: #35B4DE;
  --color-text: rgb(231, 233, 234);
  --color-bg: #303030;
  --color-panel: #222;
}
```

And a regular code block without a filename for comparison:

```python
def hello():
    print("no filename label above this one")
```
