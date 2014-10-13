---
layout: post
title: Gravatar for EmberJS
categories: [frontend]
tags: [emberjs, gravatar]
description: A clean way to integrate Gravatar images to your EmberJS application.
---

For the ones who see an "avatar feature" like nice to have and would like to integrate **Gravatar** in their EmberJS app easily, this one is for you.  

To acheive this, we will use an Ember Component to wrap this up and create something that will be reusable all across your application. 

    App.GravatarImageComponent = Ember.Component.extend({
        tagName: "img",
        size: 200,
        email: "",
    
        emailObserver: function() {
            Ember.run.debounce(this, this.getGravatar, 1000);
        }.observes("email"),
    
        fetchGravatar: function() {
            var email = this.get('email');
            var size = this.get('size');
            var gravatarUrl = "http://www.gravatar.com/avatar/" + window.MD5(email) + "?d=mm&s=" + size;
    
            this.$().attr("src", gravatarUrl);
        }.on("didInsertElement")
    });

To make it works, you will need a MD5 hash function. I took the one proposed on CSS-Tricks here http://css-tricks.com/snippets/javascript/javascript-md5/

The `fetchGravatar` is wrapped in a `Ember.run.debounce` to avoid a huge amount of useless calls to Gravatar. Let's imagine the user is typing the email address, at each keypress, the observer would trigger and call Gravatar for an invalid address.

To use it, only write this in your template

    {{gravatar-image email="pboutin@webcliniq.com" size="400" class="img-rounded"}}

Since we specified the `tagName` to our component, we don't need to define a template and it also give us the possibility to add other `img` attributes like the class.

If you want to know more about EmberJS Components, get over there : http://emberjs.com/guides/components/