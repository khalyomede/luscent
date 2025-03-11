# Luscent

Simple front-end framework to build reactive and interactive web apps.

```html
<body>

  <button data-luscent-on-click="increment">+</button>
  <div data-luscent-value="score"></div>
  <button data-luscent-on-click="decrement">-</button>

  <script src="https://cdn.jsdeliver.net/luscent/dist/index.min.js"></script>
  <script>
    const { start } = window.luscent;

    start({
      state: {
        value: 0
      },
      methods: {
        increment: (state) => ({
          ...state,
          value: state.value + 1,
        }),
        decrement: (state) => ({
          ...state,
          value: state.value - 1,
        }),
      },
      getters: {
        score: ({ value }) => value,
      },
    });
  </script>

</body>
```

## Summary

- [Features](#features)
- [Getting started](#getting-started)
- [Examples](#examples)
- [Tips](#tips)

## Features

- HTML-based reactivity system (no extra syntax to learn)
- No build tool required to get started
- First working app in ~ 5 mins
- Simple reactivity in ~ 15 lines of Javascript
- Provides state management and one way/two way data binding out of the box
- IDE completion friendly and LLM friendly thanks to its first-party support for Typescript
- Runtime included, so it can be used within the browser (Jsdeliver, Unpkg)
- Can be bundled from Node.js, Typescript, or any JS runtime that supports ES6 imports or CommonJS require syntax

[summary](#summary)

## Getting started

_Following next._

[summary](#summary)

## Examples

_Following next._

[summary](#summary)

## Tips

- [Easier debug experience](#easier-debug)

[summary](#summary)

### Easier debug experience

While not mandatory, try to assign a unique "id" attribute to all the element that uses "data-luscent-*" attributes.

Error message will tell you the exact element the error occured on if this element declares an id. This may help you find an issue faster using your IDE search.

```html
<!-- Error message not specific to this particular element -->
<div data-luscent-value="score"></div>

<!-- Error message specifically target this element -->
<div id="score" data-luscent-value="score"></div>
```

[tips](#tips)
