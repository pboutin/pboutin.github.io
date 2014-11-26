---
layout: post
title: "Enter" triggered action with EmberJS.
categories: [frontend]
tags: [emberjs]
comments: true
description: Fire an action from a text field by pressing Enter with EmberJS.
---

Being able to trigger actions from a text input, just by pressing the "Enter key" is a very easy way to add convenience to some of your primary features. Especially for search and login purposes.

Generally, it's pretty straightforward, you attach a `keypress` event to the input and *presto*.

This is what I used to do, until I noticed those two problems :

1. **Code redundancy** : If you have *n* fields that have this requirement, the `keypress` event attached to those will be duplicated *n* times. It's generally a good reason to encapsulate the logic elsewhere.
1. **Handlebars conditions** : Handlebars conditions don't simply *hide/show* things but *remove/insert* DOM elements. That means that every events you will attach to DOM elements that are in one of those conditions will be completely cleared after the first toggle. This is due to the fact that the `didInsertElement` events where you will have defined your custom DOM events will only be fired **once**.

That's why I ended up writing this simple component to encapsulate this logic. And, since the field is a View itself, it will fire its `didInsertElement` event every time the field is generated, solving the issue #2 I just mentioned.

```JavaScript
App.EnterFieldComponent = Ember.TextField.extend({
    didInsertElement: function() {
        this.$().on("keypress", function(event) {
            // Catch the enter key
            if (event.keyCode === 13) {
                this.sendAction(this.get("value"));
            }
        }.bind(this));
        this._super();
    },
    willClearRender: function() {
        this.$().off();
    }
});
```

Here's the demo :
<a class="jsbin-embed" href="http://emberjs.jsbin.com/bodifu/6/embed?html,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>
