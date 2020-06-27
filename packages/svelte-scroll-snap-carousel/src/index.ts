import {
  dragToScroll as _dragToScroll,
  useActiveSnap,
} from 'scroll-snap-carousel';

export const carousel = (node: HTMLDivElement, options = {}) => {
  const _options = { dragToScroll: true, ...options };
  let dragToScroll;

  if (_options.dragToScroll) dragToScroll = _dragToScroll({ root: node });

  useActiveSnap({ root: node });

  return {
    destroy() {
      if (_options.dragToScroll) dragToScroll.disable();
    },
  };
};
