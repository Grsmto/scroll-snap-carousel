import { RefObject, useEffect, useCallback, useState } from 'react';
import { ActiveSnap } from '@snap-carousel/core';

export const useActiveSnap = ({
  ref,
}: {
  ref: RefObject<HTMLDivElement>;
  snapPerPage?: number;
}) => {
  const [index, setIndex] = useState(0);

  const handleActiveSnapChange = useCallback((snapIndex: number) => {
    setIndex(snapIndex);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const { destroy } = new ActiveSnap({
      root: ref.current,
      onChange: handleActiveSnapChange,
    });

    return () => {
      destroy();
    };
  }, []);

  return index;
};
