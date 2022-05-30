# Scroll Snap Carousel

Scroll Snap Carousel is a helper to enhance the native [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) experience. If you ever wanted to use CSS Scroll Snap to create a carousel but were missing basic features like "active dots" indicator and drag scroll, this is for you!

### Installation

**- Via npm**
`npm install @snap-carousel/core --save` or for React `npm install @snap-carousel/react --save`

**- Via Yarn**
`yarn add @snap-carousel/core` or for React `yarn add @snap-carousel/react`

### Usage

```
<style>
  .carousel-container {
    scroll-snap-type: x mandatory;
    overflow-y: hidden;
    overflow-x: auto;
    ...
    display: flex;
    flex-direction: row;
  }
</style>
```

```js
import {
  useDragToScroll,
  useScroll,
  useActiveSnap,
} from '@snap-carousel/react';
import '@snap-carousel/core/dist/styles.css';

const Component = () => {
  useDragToScroll({ ref });

  return (
    <div ref={ref} className="carousel-container">
      {slides.map((slide) => (
        <div className="slide" key={slide}>
          {slide}
        </div>
      ))}
    </div>
  )
}
```

## :warning: This project is a WIP!

Scroll Snap Carousel is a carousel based on **native CSS Scroll Snap**.
It is dependency free with vanilla JS at its core, but comes with support for various frameworks.
It's a rework of [react-snaplist-carousel](https://github.com/luispuig/react-snaplist-carousel) in vanilla JS.

- **Smoother than ever** since it uses native CSS Scroll Snap, scroll behaviour basically can't be smoother!
- **Native scroll experience** trackpad scroll, touch swipe, etc. all of this comes for natively, without cost, thanks to CSS Scroll Snap.
- **Lightweight** it really doesn't do much.
- **Works everywhere** with plugins for React, Svelte, Vue and Angular (soon?).
