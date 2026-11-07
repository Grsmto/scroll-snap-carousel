import { debounceHOF, getElementPositionX } from './utils';

export const getSnapPositionsX = (root: HTMLElement): number[] => {
  const maxScroll = root.scrollWidth - root.clientWidth;

  return Array.from(root.children).map((element) =>
    Math.min(
      Math.max(0, getElementPositionX(root, element as HTMLElement)),
      maxScroll
    )
  );
};

export const getScrollProgress = (
  scrollLeft: number,
  positions: number[]
): number => {
  const lastIndex = positions.length - 1;

  if (lastIndex < 1 || scrollLeft <= positions[0]) return 0;
  if (scrollLeft >= positions[lastIndex]) return lastIndex;

  for (let index = 0; index < lastIndex; index++) {
    const start = positions[index];
    const end = positions[index + 1];

    if (scrollLeft <= end) {
      return end === start
        ? index + 1
        : index + (scrollLeft - start) / (end - start);
    }
  }

  return lastIndex;
};

export const observeScrollProgress = ({
  root,
  onProgress,
}: {
  root: HTMLElement;
  onProgress: (progress: number) => void;
}) => {
  let positions = getSnapPositionsX(root);
  let frame: number | null = null;

  const update = () => {
    frame = null;
    onProgress(getScrollProgress(root.scrollLeft, positions));
  };

  const onScroll = () => {
    if (frame === null) frame = requestAnimationFrame(update);
  };

  const onResize = debounceHOF(() => {
    positions = getSnapPositionsX(root);
    update();
  }, 100);

  root.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  update();

  const destroy = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    root.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };

  return { destroy };
};
