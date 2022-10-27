import { utils } from '@snap-carousel/core';

export const { isTouchDevice } = utils;

export { useDragToScroll } from './useDragToScroll';
export { useScroll } from './useScroll';
export { useActiveSnap } from './useActiveSnap';

export {
  SnapCarousel,
  useSnapCarousel,
  SnapCarouselIndicator,
  SnapCarouselNavPrev,
  SnapCarouselNavNext,
} from './SnapCarousel';
