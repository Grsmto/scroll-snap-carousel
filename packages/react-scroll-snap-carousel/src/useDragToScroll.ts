import { RefObject } from 'react';
import { dragToScroll } from 'scroll-snap-carousel';

export const useDragToScroll = ({
  ref,
  disabled = false,
}: {
  ref: RefObject<HTMLDivElement>;
  disabled?: boolean;
}) => (index: number) => dragToScroll({ root: ref.current, index });
