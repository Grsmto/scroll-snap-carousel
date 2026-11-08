import { RefObject, useEffect, useRef } from 'react';
import { observeScrollProgress } from '@snap-carousel/core';

export const useScrollProgress = ({
  ref,
  onProgress,
}: {
  ref: RefObject<HTMLElement>;
  onProgress: (progress: number) => void;
}) => {
  const onProgressRef = useRef(onProgress);

  onProgressRef.current = onProgress;

  useEffect(() => {
    if (!ref.current) return;

    const { destroy } = observeScrollProgress({
      root: ref.current,
      onProgress: (progress) => onProgressRef.current(progress),
    });

    return destroy;
  }, []);
};
