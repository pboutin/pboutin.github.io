---
layout: post
title: Get changes on a model, using Ember-Data
categories: [frontend]
tags: [emberjs]
comments: true
description: How to get changed attributes and changed relations on a given model.
---

### Which attributes changed on my model ?

Ember-Data delivers a pretty usefull method called `.changedAttributes()` to track which attributes changed on a given model. 

It behaves like this :

```JavaScript
post.set('title', 'Hurray !');
post.set('body', 'Some text');
post.changedAttributes(); -> {title: ['oldTitle','Hurray !'], body: ... }
```

Using this, you can easily get a list of the attributes that changed by doing `Object.keys(post.changedAttributes())`.

### Which relations changed on my model ?

Huh, this one is more tricky since Ember-Data doesn't offers this feature yet at the time of writting. But since I faced this need, I added this feature to `DS.Model`. Let me share it with you :

```JavaScript
DS.Model.reopen({
    changedRelations: function() {
        var changedRelations = [];

        this.eachRelationship(function(name, relationship) {
            if (relationship.kind === 'belongsTo') {
                if (parseInt(this._internalModel._data[name], 10) !== parseInt(this.get(name + '.id'), 10)) {
                    changedRelations.push(name);
                }
            } else if (relationship.kind === 'hasMany') {
                var initial = this._internalModel._data[name].map(function(element) {
                    return parseInt(element.id, 10);
                });

                var current = this.get(name).map(function(element) {
                    return parseInt(element.get('id'), 10);
                });

                // _.difference is a LoDash method that validate if the 2 arrays contains
                // the same elements, if you don't use LoDash, make yourself a little util
                // that does it.
                if (initial.length !== current.length || _.difference(initial, current).length > 0) {
                    changedRelations.push(name);
                }
            }
        }.bind(this));

        return changedRelations;
    }
});
```

Calling `post.changedRelations()` would give you a list of the name of the relations that changed. It wont gives the before and after like `.changedAttributes()` does, but if you need it, I bet it would be pretty easy to update my snippet to do so.

#### Versions involved 
> Ember: v1.9.*  
Ember-Data: v1.0.0 beta 19
