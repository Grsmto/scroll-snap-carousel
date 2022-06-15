import { RefObject, useRef } from 'react';
import { scrollTo } from '@snap-carousel/core';

export const useScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const scrollRef = useRef<ReturnType<typeof scrollTo>>();

  return (index: number) => {
    if (scrollRef.current?.index === index) return;
    if (scrollRef.current) {
      scrollRef.current.cancel && scrollRef.current.cancel();
    }

    scrollRef.current = scrollTo({ root: ref.current, index });

    return scrollRef.current;
  };
};
