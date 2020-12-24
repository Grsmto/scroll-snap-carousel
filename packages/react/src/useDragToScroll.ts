import { RefObject, useEffect } from 'react';
import { dragToScroll } from '@snap-carousel/core';

export const useDragToScroll = ({
  ref,
}: {
  ref: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (ref.current) dragToScroll({ root: ref.current });
  }, []);
};
