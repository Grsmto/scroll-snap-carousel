import {
  dragToScroll as _dragToScroll,
  getActiveSnap,
  scrollTo,
} from '@snap-carousel/core';

export const carousel = (node: HTMLDivElement, options = {}) => {
  const _options = { dragToScroll: true, ...options };
  let dragToScroll: {
    isDragging: boolean;
    disable: () => void;
    enable: () => void;
  };

  if (_options.dragToScroll) dragToScroll = _dragToScroll({ root: node });

  const activeSnap = getActiveSnap({ root: node });

  return {
    getActiveIndex: activeSnap.getActiveIndex,
    destroy() {
      if (_options.dragToScroll) dragToScroll.disable();
      activeSnap.destroy();
    },
  };
};

export { scrollTo };
