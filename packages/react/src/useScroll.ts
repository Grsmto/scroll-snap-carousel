import { RefObject } from 'react';
import { scrollTo } from '@snap-carousel/core';

export const useScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => (
  index: number
) => scrollTo({ root: ref.current, index });
