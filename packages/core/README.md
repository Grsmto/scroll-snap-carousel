# SimplebarReact

### Installation

**- Via npm**
`npm install @snap-carousel/core --save`

**- Via Yarn**
`yarn add @snap-carousel/core`

### Usage

Check out the [Demo project](https://github.com/Grsmto/simplebar/blob/master/examples/react/src/App.js) or our live [Codesandbox example](https://codesandbox.io/s/simplebar-react-gwgyw).

If you are using a module loader (like Webpack) you first need to load SimpleBar:

```js
import { getActiveSnap, scrollTo, dragToScroll } from '@snap-carousel/core';
import '@snap-carousel/core/dist/styles.css';

const root = document.querySelector('.carousel');

const activeSnap = getActiveSnap({
  root,
  onChange: (snapIndex) => {
    console.log('active snap changed to: ', snapIndex);
  },
});

const activeSnapIndex = activeSnap.getActiveIndex();

scrollTo({ root, index: 2, duration: 0 });
```

**Don't forget to import both css and js in your project!**
