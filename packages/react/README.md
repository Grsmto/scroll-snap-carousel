# Snap Carousel React

### Installation

**- Via npm**
`npm install @snap-carousel/react --save`

**- Via Yarn**
`yarn add @snap-carousel/react`

### Usage

## Component

```js
import {
  SnapCarousel
} from '@snap-carousel/react';
import '@snap-carousel/react/dist/styles.css';

const Component = () => {
  let slides = [...];

  return (
    <SnapCarousel>
      {slides.map((slide) => (
        <div className="slide" key={slide}>
          {slide}
        </div>
      ))}
    </SnapCarousel>
  );
};
```

## Hooks

```js
import {
  useDragToScroll,
  useScroll,
  useActiveSnap,
} from '@snap-carousel/react';
import '@snap-carousel/core/dist/styles.css';

const Component = () => {
  const ref = React.useRef();

  useDragToScroll({ ref });

  let slides = [...];

  return (
    <div ref={ref}>
      {slides.map((slide) => (
        <div key={slide}>
          {slide}
        </div>
      ))}
    </div>
  );
};
```

For more advanced usage see [the Storybook stories](https://github.com/Grsmto/scroll-snap-carousel/blob/master/packages/docs/stories).

**Don't forget to import both css and js in your project!**
