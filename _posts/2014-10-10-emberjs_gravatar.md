---
layout: post
title: Gravatar for EmberJS
categories: [frontend]
tags: [emberjs]
comments: true
description: A clean way to bring Gravatar images to your EmberJS application.
---

For the ones who see an "avatar feature" like a nice to have and would like to integrate Gravatar in their EmberJS app easily, this component is what you might need.  

To acheive this, we will use an Ember Component to wrap this up and create something that will be reusable all across your application. 

```JavaScript
App.GravatarImageComponent = Ember.Component.extend({
    tagName: "img",
    size: 200,
    email: "",

    emailObserver: function() {
        Ember.run.debounce(this, this.fetchGravatar, 1000);
    }.observes("email"),

    fetchGravatar: function() {
        var email = this.get('email');
        var size = this.get('size');
        var gravatarUrl = "http://www.gravatar.com/avatar/" + window.MD5(email) + "?d=mm&s=" + size;

        this.$().attr("src", gravatarUrl);
    }.on("didInsertElement")
});
```

To make it works, the only thing you will need is a MD5 hash function. I took the one proposed on CSS-Tricks [here](http://css-tricks.com/snippets/javascript/javascript-md5/).

The `fetchGravatar` is wrapped in a `Ember.run.debounce` to avoid a bunch of useless calls to Gravatar. Let's imagine that the user is changing the bound email address. That would mean that at each keypress, the observer would kick off and calls Gravatar with an invalid address.

To use it, only include this in your template : 

```Handlebars
{% raw %}
{{gravatar-image email="pboutin@webcliniq.com" size="400" class="img-rounded"}}
{% endraw %}
```

Since we specified the `tagName` to our component, we can play directly on the `img` DOM element with other attributes like the class for example.

If you want to learn more about EmberJS Components, get over there : [EmberJS guide](http://emberjs.com/guides/components/)