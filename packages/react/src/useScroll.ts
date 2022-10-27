import { RefObject, useRef } from 'react';
import { scrollTo } from '@snap-carousel/core';

export const useScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const scrollRef = useRef<ReturnType<typeof scrollTo>>();

  return (index: number, duration?: number) => {
    if (scrollRef.current) {
      scrollRef.current.cancel && scrollRef.current.cancel();
    }

    scrollRef.current = scrollTo({ root: ref.current, index, duration });

    return scrollRef.current;
  };
};
