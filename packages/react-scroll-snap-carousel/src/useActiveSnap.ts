import { RefObject, useEffect } from 'react';
import { getActiveSnap } from 'scroll-snap-carousel';

export const useActiveSnap = ({
  ref,
  onChange,
}: {
  ref: RefObject<HTMLDivElement>;
  onChange: () => {};
}) => {
  useEffect(() => {
    if (ref.current) getActiveSnap({ root: ref.current, onChange });
  }, []);
};
