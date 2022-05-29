import { RefObject, useEffect, useCallback, useState } from 'react';
import { getActiveSnap } from '@snap-carousel/core';

export const useActiveSnap = ({
  ref,
}: {
  ref: RefObject<HTMLDivElement>;
  snapPerPage?: number;
}) => {
  const [index, setIndex] = useState(0);

  const handleActiveSnapChange = useCallback((snapIndex) => {
    setIndex(snapIndex);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const { destroy } = getActiveSnap({
      root: ref.current,
      onChange: handleActiveSnapChange,
    });

    return () => {
      destroy();
    };
  }, []);

  return index;
};
