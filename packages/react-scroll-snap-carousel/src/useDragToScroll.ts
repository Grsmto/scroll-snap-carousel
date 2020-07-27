import { RefObject, useEffect } from 'react';
import { dragToScroll } from 'scroll-snap-carousel';

export const useDragToScroll = ({
  ref,
}: {
  ref: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (ref.current) dragToScroll({ root: ref.current });
  }, []);
};
