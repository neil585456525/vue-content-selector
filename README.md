# vue-content-selector

A vue-component that select the html element position and inject content visually !

Inspired by chrome devtool & google-optimize.

![demo gif](https://i.imgur.com/hh6Vxtb.gif)

# Roadmap

- [x] Basic componet usage
- [x] Modify position appearance
- [ ] Add unit-testing
- [ ] Add e2e-testing
- [ ] List and select parent element

# Install

```
npm install @neil585456525/vue-content-selector
```

# Usage

```js
import { createApp } from "vue";
import VueContentSelector from "@neil585456525/vue-content-selector";
import App from "./App.vue";

createApp(App).use(VueContentSelector).mount("#app");
```

```html
<template>
  <div>
    <vue-content-selector>
      # things you want to dynamic injected
      <custom-content />
    </vue-content-selector>
  </div>
</template>
```

# Api

```ts
interface Props {
  isWidgetInShadow?: boolean;
  widgetStyleInShadow?: string;
  isContentInShadow?: boolean;
  contentStyleInShadow?: string;
  baseZIndex?: number;
}
```

## Props

- `isWidgetInShadow`

  - type: Boolean
  - default: true

  Should widget component rendered in shawdow dom, which can encapsulate css style. It will be convenient when injecte into customer pages.

- `widgetStyleInShadow`

  - type: String

  When widget component in shawdow dom, it will encapsulate global css style. You can provide the css string to override the style, it will auto inject into shadow.

- `isContentInShadow`

  - type: Boolean
  - default: false

  Let injected-contnet component rendered in shawdow dom.

- `contentStyleInShadow`

  - type: String

  Auto injected-contnet style into shadow.

- `baseZIndex`

  - type: Number

  Set the widget base-z-index, it also affect positionSelecter logic.

# Discussion

This project is trying to build a library to select the html element position and inject content visually in any website!
To achieve this there are a number of primary problems should be solved as bellow.

1. Isolate css from the original page.

- Using shadow dom and custom webpack style-loader config to dynamic inject style into the shadow root.
  I don't using iframe as my solution because I want it can easily communicate with page runtime, and it's also can deploy more smoothly.

2. Selecting page element with the cursor, but don't trigger the element event, also try to optimize the performence as possible.

- Oringinal I used dynamic event binding when any elememnt that cursor hovered, but it can't prevent the original element hover and click behavior, and will cause some performence problem, so I come out another solution. Using an invisible mask and using elementFromPoint API to reach this effect, this can solve both problems.

# Development

In root folder :

```
yarn intall
yarn dev

```

Then in `/example` folder

```
yarn install
yarn serve
```
