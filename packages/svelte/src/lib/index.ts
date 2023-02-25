import {
  dragToScroll as _dragToScroll,
  ActiveSnap,
  scrollTo,
} from '@snap-carousel/core';
import SnapCarousel from './SnapCarousel.svelte';

export const carousel = (node: HTMLDivElement, options = {}) => {
  const _options = { dragToScroll: true, onIndexChange: () => {}, ...options };
  let dragToScroll: ReturnType<typeof _dragToScroll>;

  if (_options.dragToScroll) dragToScroll = _dragToScroll({ root: node });

  const activeSnap = new ActiveSnap({
    root: node,
    onChange: _options.onIndexChange,
  });

  return {
    getActiveIndex: activeSnap.activeSnapIndex,
    destroy() {
      if (_options.dragToScroll) dragToScroll.disable();
      activeSnap.destroy();
    },
  };
};

export { scrollTo, SnapCarousel };
