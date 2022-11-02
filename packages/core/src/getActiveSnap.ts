import { debounceHOF } from './utils';

export const getActiveSnap = ({
  root,
  onChange,
}: {
  root: HTMLDivElement;
  onChange?: (snapIndex: number) => void;
}) => {
  let activeSnapObserver: IntersectionObserver;
  let activeSnapIndex = 0;
  let observers = new WeakMap();

  const children = root.children;
  const firstChild = root.children[0] as HTMLElement;

  const triggerChange = (snapIndex: number) => {
    if (root.classList.contains('scrolling')) return;

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
    Array.from(root.children).forEach((child) => {
      if (observers.has(child)) {
        observers.get(child).disconnect();
      }
    });
    observers = new WeakMap();
  };

  const setSnapIndex = (snapIndex: number) => {
    activeSnapIndex = snapIndex;
    triggerChange(snapIndex);
  };

  const onResize = () => {
    destroy();
    init();
  };

  const onResizeWithDebounce = debounceHOF(onResize, 100);

  const handleScrolling = () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (root.scrollLeft === 0) {
        setSnapIndex(0);
      }
    }, 50) as any;
  };

  const init = () => {
    const $viewport: HTMLElement = root;
    const viewportWidth = $viewport.offsetWidth;

    activeSnapIndex = 0;

    activeSnapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const styles = window.getComputedStyle(
              entry.target
            ) as CSSStyleDeclaration;
            if (observers.has(entry.target)) return;

            const observer = getObserver(styles.scrollSnapAlign);
            observer.observe(entry.target);
            observers.set(entry.target, observer);
          } else {
            if (observers.has(entry.target)) {
              observers.get(entry.target).disconnect();
              observers.delete(entry.target);
            }
          }
        });
      },
      {
        root,
        rootMargin: `0px 0px`,
        threshold: [0.5],
      }
    );

    const getObserver = (snapAlign: string) => {
      switch (snapAlign) {
        case 'start':
          return new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                console.log('active snap: ', entry);

                if (activeSnapIndex === null || !entry.rootBounds) return;

                const entryIndex = Array.prototype.indexOf.call(
                  children,
                  entry.target
                );

                if (
                  entry.isIntersecting &&
                  entry.boundingClientRect.right > 0
                ) {
                  setSnapIndex(entryIndex + 1);
                  return;
                }

                if (
                  !entry.isIntersecting &&
                  entry.intersectionRatio > 0 &&
                  entry.boundingClientRect.right - entry.rootBounds.right > 0
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
        case 'end':
          return new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // console.log('active snap: ', entry);

                if (activeSnapIndex === null) return;

                const entryIndex = Array.prototype.indexOf.call(
                  children,
                  entry.target
                );

                if (
                  entry.isIntersecting &&
                  entry.boundingClientRect.left < viewportWidth
                ) {
                  setSnapIndex(entryIndex - 1);
                  return;
                }

                if (
                  !entry.isIntersecting &&
                  entry.intersectionRatio > 0 &&
                  entry.boundingClientRect.left < viewportWidth
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
        case 'center':
        default:
          return new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // console.log('active snap: ', entry);

                if (activeSnapIndex === null || !entry.rootBounds) return;

                if (
                  entry.boundingClientRect.left <=
                    entry.rootBounds.left +
                      entry.boundingClientRect.width * 0.01 &&
                  entry.boundingClientRect.right >=
                    entry.rootBounds.left +
                      entry.boundingClientRect.width * 0.01
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
      }
    };

    root.addEventListener('scroll', handleScrolling);

    Array.from(root.children).forEach((child) => {
      activeSnapObserver.observe(child);
    });

    window.addEventListener('resize', onResizeWithDebounce);
  };

  init();

  return {
    destroy,
    getActiveIndex: () => {
      return activeSnapIndex;
    },
  };
};
