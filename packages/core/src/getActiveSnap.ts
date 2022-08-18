import { mapStyles, debounceHOF } from './utils';

export const getActiveSnap = ({
  root,
  onChange,
}: {
  root: HTMLDivElement;
  snapPerPage?: number;
  onChange?: (snapIndex: number) => void;
}) => {
  let activeSnapObserver: IntersectionObserver;
  let activeSnapIndex: number;
  let timeout: number | null = null;
  let isScrolling = false;

  const children = root.children;

  const triggerChange = (snapIndex: number) => {
    onChange && onChange(snapIndex);
    root.dispatchEvent(
      new CustomEvent('snap-change', {
        detail: { snapIndex },
      })
    );
  };

  const destroy = () => {
    activeSnapObserver.disconnect();
    window.removeEventListener('resize', onResizeWithDebounce);
  };

  const setSnapIndex = (snapIndex: number) => {
    activeSnapIndex = snapIndex;
  };

  const onResize = () => {
    destroy();
    init();
  };

  const onResizeWithDebounce = debounceHOF(onResize, 100);

  const handleScrolling = () => {
    isScrolling = true;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      // if (root.scrollLeft === 0) {
      //   setSnapIndex(0);
      // } else if (root.scrollLeft === root.scrollWidth - root.offsetWidth) {
      //   setSnapIndex(children.length - 1);
      // }
      triggerChange(activeSnapIndex);
      isScrolling = false;
    }, 350) as any;
  };

  const init = () => {
    const rootWidth = root.offsetWidth;
    const item = mapStyles(children[0]);

    // TODO: detect snapAlign config in another way. Only 1 supported per carousel.

    activeSnapIndex = 0;

    switch (item.snapAlign) {
      case 'start':
        activeSnapObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // console.log('active snap: ', entry);

              if (activeSnapIndex === null) return;

              const entryIndex = Array.prototype.indexOf.call(
                children,
                entry.target
              );

              if (entry.isIntersecting && entry.boundingClientRect.right > 0) {
                setSnapIndex(entryIndex + 1);
                return;
              }

              if (
                !entry.isIntersecting &&
                entry.intersectionRatio > 0 &&
                entry.boundingClientRect.right > 0
              ) {
                setSnapIndex(entryIndex);
                return;
              }
            });
          },
          {
            root,
            rootMargin: `0px -100% 0px 50%`,
            threshold: [0.5],
          }
        );
        break;
      case 'end':
        activeSnapObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              console.log('active snap: ', entry);

              if (activeSnapIndex === null || !isScrolling) return;

              const entryIndex = Array.prototype.indexOf.call(
                children,
                entry.target
              );

              if (
                entry.isIntersecting &&
                entry.boundingClientRect.left < rootWidth
              ) {
                setSnapIndex(entryIndex - 1);
                return;
              }

              if (
                !entry.isIntersecting &&
                entry.intersectionRatio > 0 &&
                entry.boundingClientRect.left < rootWidth
              ) {
                setSnapIndex(entryIndex);
                return;
              }
            });
          },
          {
            root,
            rootMargin: `0px 50% 0px -100%`,
            threshold: [0.5],
          }
        );
        break;
      case 'center':
      default:
        activeSnapObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              console.log('active snap: ', entry);

              if (activeSnapIndex === null || !isScrolling || !entry.rootBounds)
                return;

              if (
                entry.intersectionRatio >= 0.49 &&
                entry.intersectionRatio <= 0.51 &&
                entry.boundingClientRect.left <=
                  entry.rootBounds.left +
                    entry.boundingClientRect.width * 0.01 &&
                entry.boundingClientRect.right >=
                  entry.rootBounds.left + entry.boundingClientRect.width * 0.01
              ) {
                const entryIndex = Array.prototype.indexOf.call(
                  children,
                  entry.target
                );

                setSnapIndex(entryIndex);
                return;
              }
            });
          },
          {
            root,
            rootMargin: `0px 0px 0px -50%`,
            threshold: [0.49, 0.51],
          }
        );
        break;
    }

    root.addEventListener('scroll', handleScrolling);

    Array.from(root.children).forEach((child) => {
      activeSnapObserver.observe(child);
    });

    window.addEventListener('resize', onResizeWithDebounce);
  };

  init();

  return {
    destroy,
  };
};
