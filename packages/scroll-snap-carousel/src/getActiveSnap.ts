import { mapItem } from './utils';

const debounceHOF = (callback: () => void, ms: number) => {
  let timeout: any;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      callback();
    }, ms);
  };
};

const getVisibleChildren = ($viewport: HTMLDivElement) => {
  if (!$viewport) return { children: [], childrenInCenter: 0 };
  const viewport = {
    left: $viewport.scrollLeft,
    width: $viewport.offsetWidth,
    right: $viewport.scrollLeft + $viewport.offsetWidth,
    top: $viewport.scrollTop,
    height: $viewport.offsetHeight,
    bottom: $viewport.scrollTop + $viewport.offsetHeight,
    offsetLeft: $viewport.offsetLeft,
    offsetTop: $viewport.offsetTop,
    centerHorizontal: $viewport.scrollLeft + $viewport.offsetWidth / 2,
    centerVertical: $viewport.scrollTop + $viewport.offsetHeight / 2,
  };
  const children = [];
  const elements = $viewport.children;
  let childrenInCenter = 0;

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index] as HTMLElement;
    const elementBounds = mapItem({ element, viewport });
    const isVisibleHorizontally =
      elementBounds.left >= viewport.left &&
      elementBounds.right <= viewport.right;
    const isVisibleVertically =
      elementBounds.top >= viewport.top &&
      elementBounds.bottom <= viewport.bottom;
    const isInCenterHorizontally =
      elementBounds.left <= viewport.centerHorizontal &&
      elementBounds.right >= viewport.centerHorizontal;
    const isInCenterVertically =
      elementBounds.top <= viewport.centerVertical &&
      elementBounds.bottom >= viewport.centerVertical;

    if (isVisibleHorizontally && isVisibleVertically) {
      children.push(index);
    }
    if (isInCenterHorizontally && isInCenterVertically) {
      childrenInCenter = index;
    }
  }
  return { children, childrenInCenter };
};

export const getActiveSnap = ({
  root,
  onChange,
}: {
  root: HTMLDivElement;
  snapPerPage?: number;
  onChange?: (index: number) => void;
}) => {
  let activeSnapObserver: IntersectionObserver;
  let firstSlideObserver: IntersectionObserver;
  let lastSlideObserver: IntersectionObserver;
  let snapIndex: number;
  let activeSlideIndex: number;
  let isIndexLocked: boolean;

  const children = root.children;

  const triggerChange = (snapIndex: number) => {
    onChange && onChange(snapIndex);
    root.dispatchEvent(
      new CustomEvent('snap-change', {
        detail: {
          snapIndex,
        },
      })
    );
  };

  const destroy = () => {
    activeSnapObserver.disconnect();
    firstSlideObserver.disconnect();
    lastSlideObserver.disconnect();
    window.removeEventListener('resize', onResizeWithDebounce);
  };

  const setSnapIndex = (newSnapIndex: number) => {
    if (
      isIndexLocked &&
      newSnapIndex !== 0 &&
      newSnapIndex !== children.length - 1
    ) {
      return;
    }

    snapIndex = newSnapIndex;

    triggerChange(snapIndex);
  };

  const onResize = () => {
    destroy();
    init();
  };

  const onResizeWithDebounce = debounceHOF(onResize, 100);

  const init = () => {
    const rootWidth = root.offsetWidth;
    const rootMargin = `0px 0px 0px -${rootWidth / 2}px`;

    snapIndex = root.scrollLeft ? getVisibleChildren(root).childrenInCenter : 0;
    isIndexLocked = !snapIndex;
    activeSlideIndex = snapIndex;

    activeSnapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const entryIndex = Array.prototype.indexOf.call(
            children,
            entry.target
          );

          // entry.rootBounds is wrong on Webkit if there is a padding on the root
          // so we use the BoundingClientRect instead
          const rootBb = root.getBoundingClientRect();

          if (snapIndex !== null) {
            // If next
            if (
              entryIndex > activeSlideIndex &&
              entry.rootBounds &&
              entry.boundingClientRect.left < rootBb.left + rootBb.width / 2
            ) {
              activeSlideIndex = entryIndex;

              activeSnapObserver.unobserve(entry.target);
              children[entryIndex - 2] &&
                activeSnapObserver.unobserve(children[entryIndex - 2]);

              if (children[entryIndex + 1]) {
                activeSnapObserver.observe(children[entryIndex + 1]);
                setSnapIndex(snapIndex + 1);
              }

              if (children[entryIndex - 1])
                activeSnapObserver.observe(children[entryIndex - 1]);

              return;
            }

            // If previous
            if (
              entryIndex < activeSlideIndex &&
              entry.rootBounds &&
              entry.boundingClientRect.right > rootBb.left + rootBb.width / 2
            ) {
              activeSlideIndex = entryIndex;

              activeSnapObserver.unobserve(entry.target);
              children[entryIndex + 2] &&
                activeSnapObserver.unobserve(children[entryIndex + 2]);

              if (children[entryIndex - 1]) {
                activeSnapObserver.observe(children[entryIndex - 1]);
                setSnapIndex(snapIndex - 1);
              }

              if (children[entryIndex + 1])
                activeSnapObserver.observe(children[entryIndex + 1]);
            }
          }
        });
      },
      {
        root,
        rootMargin,
        threshold: [0.49, 0.51],
      }
    );

    firstSlideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            activeSnapObserver.unobserve(children[activeSlideIndex]);
            activeSnapObserver.observe(children[1]);
            isIndexLocked = true;
            activeSlideIndex = 0;

            setSnapIndex(activeSlideIndex);
          }

          if (entry.isIntersecting && entry.intersectionRatio < 1) {
            isIndexLocked = false;
          }
        });
      },
      {
        root,
        threshold: [0, 0.5, 1],
      }
    );

    lastSlideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!snapIndex) return;

          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            activeSnapObserver.unobserve(children[activeSlideIndex]);
            activeSnapObserver.observe(children[children.length - 2]);
            isIndexLocked = true;
            activeSlideIndex = snapIndex + 1;
            setSnapIndex(activeSlideIndex);
          }

          if (entry.isIntersecting && entry.intersectionRatio < 1) {
            isIndexLocked = false;
          }
        });
      },
      {
        root,
        threshold: [0, 1],
      }
    );

    // Set intersection observers
    if (children[snapIndex - 1])
      activeSnapObserver.observe(children[snapIndex - 1]);
    activeSnapObserver.observe(
      children[snapIndex + 1] ? children[snapIndex + 1] : children[snapIndex]
    );
    firstSlideObserver.observe(children[0]);
    lastSlideObserver.observe(children[children.length - 1]);

    window.addEventListener('resize', onResizeWithDebounce);
  };

  init();

  return {
    destroy,
  };
};
