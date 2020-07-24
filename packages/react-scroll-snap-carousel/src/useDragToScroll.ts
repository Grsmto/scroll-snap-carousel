import { RefObject, useEffect } from 'react';
import { dragToScroll } from 'scroll-snap-carousel';

export const useDragToScroll = ({
  ref,
  disabled = false,
}: {
  ref: RefObject<HTMLDivElement>;
  disabled?: boolean;
}) => {
  useEffect(() => {
    dragToScroll({ root: ref.current });
  }, []);
};
