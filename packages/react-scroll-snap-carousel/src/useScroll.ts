import { RefObject } from 'react';
import { scrollTo } from 'scroll-snap-carousel';

export const useScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => (
  index: number
) => scrollTo({ root: ref.current, index });
