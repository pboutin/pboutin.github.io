---
layout: post
title: Sortable array using EmberJS
categories: [frontend]
tags: [emberjs]
comments: true
description: How to make a simple component that will makes you tables sortable.
---

It's pretty common in an application that display a large amount of information, to be able to sort grids and tables by clicking their headers.

Even thought it's not a "killer" feature, I asked myself how I could implement it in a clean and flexible EmberJS way.

I wrapped up this logic within a [component](http://emberjs.com/guides/components/) that would substitute a grid's header. By doing this, I can decide on a per-case basis which columns I want to be sortable. Also, limiting the scope to a single `<th>` makes it easier to customize.

Nothing could explain the thing better than the code itself, so there it is :

<a class="jsbin-embed" href="http://emberjs.jsbin.com/jorece/24/embed?js,output">EmberJS sortable array</a><script src="http://static.jsbin.com/js/embed.js"></script>


To use it, you only have to integrate that component inside your template, into the `<table>`.

**NOTE** : A reference of your `ArrayController` is required so that the component can change their `sortProperties` and `sortAscending`.

```HTML
{% raw %}
<thead>
    <tr>
        {{#sort-header arrayController=this column="first"}}FIRST{{/sort-header}}
        {{#sort-header arrayController=this column="second"}}SECOND{{/sort-header}}
        {{#sort-header arrayController=this column="third"}}THIRD{{/sort-header}}
    </tr>
</thead>
{% endraw %}
```
