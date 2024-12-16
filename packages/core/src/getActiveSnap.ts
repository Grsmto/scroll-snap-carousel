import { debounceHOF, getStyles } from './utils';

export class ActiveSnap {
  activeSnapObserver: IntersectionObserver | null = null;
  onResizeWithDebounce: () => void;
  activeSnapIndex = 0;
  observers = new WeakMap();
  root: HTMLElement;
  children: HTMLCollection;
  firstChild: HTMLElement;
  onChange?: (snapIndex: number) => void;

  constructor({
    root,
    onChange,
  }: {
    root: HTMLElement;
    onChange?: (snapIndex: number) => void;
  }) {
    this.root = root;
    this.children = root.children;
    this.firstChild = root.children[0] as HTMLElement;
    this.onChange = onChange;

    this.onResizeWithDebounce = debounceHOF(this.onResize, 100);

    this.init();
  }

  triggerChange = (snapIndex: number) => {
    this.onChange && this.onChange(snapIndex);
    this.root.dispatchEvent(
      new CustomEvent('snap-change', {
        detail: { snapIndex },
      })
    );
  };

  destroy = () => {
    this.activeSnapObserver?.disconnect();
    window.removeEventListener('resize', this.onResizeWithDebounce);
    Array.from(this.root.children).forEach((child) => {
      if (this.observers.has(child)) {
        this.observers.get(child).disconnect();
      }
    });
    this.observers = new WeakMap();
  };

  setSnapIndex = (snapIndex: number) => {
    this.activeSnapIndex = snapIndex;
    this.triggerChange(snapIndex);
  };

  onResize = () => {
    this.destroy();
    this.init();
  };

  init = () => {
    const $viewport: HTMLElement = this.root;
    const viewportWidth = $viewport.offsetWidth;

    this.activeSnapIndex = 0;

    if (typeof IntersectionObserver === 'undefined') {
      return console.warn(
        'SnapCarousel: IntersectionObserver is not supported'
      );
    }

    this.activeSnapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const styles = window.getComputedStyle(
              entry.target
            ) as CSSStyleDeclaration;
            if (this.observers.has(entry.target)) return;

            const observer = getObserver(styles.scrollSnapAlign);
            observer.observe(entry.target);
            this.observers.set(entry.target, observer);
          } else {
            if (this.observers.has(entry.target)) {
              // wait for all observers to trigger before cleaning up
              setTimeout(() => {
                this.observers.get(entry.target).disconnect();
                this.observers.delete(entry.target);
              }, 0);
            }
          }
        });
      },
      {
        root: this.root,
        rootMargin: `0px 0px`,
        threshold: [0.5],
      }
    );

    const getObserver = (snapAlign: string) => {
      const viewportStyles = getStyles($viewport, [
        'paddingLeft',
        'paddingRight',
      ]);
      const firstChildStyles = getStyles(this.firstChild, ['marginLeft']);

      if (viewportStyles.paddingLeft || viewportStyles.paddingRight)
        console.warn(
          'SnapCarousel: horizontal padding on container is not supported by getActiveSnap.'
        );

      switch (snapAlign) {
        case 'start':
          return new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // console.log('active snap: ', entry);

                if (this.activeSnapIndex === null || !entry.rootBounds) return;

                const entryIndex = Array.prototype.indexOf.call(
                  this.children,
                  entry.target
                );

                if (
                  entry.isIntersecting &&
                  entry.boundingClientRect.right > 0
                ) {
                  this.setSnapIndex(entryIndex + 1);
                  return;
                }

                if (
                  !entry.isIntersecting &&
                  entry.intersectionRatio > 0 &&
                  entry.boundingClientRect.right - entry.rootBounds.right > 0
                ) {
                  this.setSnapIndex(entryIndex);
                  return;
                }
              });
            },
            {
              root: this.root,
              rootMargin: `0px -100% 0px 50%`,
              threshold: [0.5],
            }
          );
        case 'end':
          return new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // console.log('active snap: ', entry);

                if (this.activeSnapIndex === null) return;

                const entryIndex = Array.prototype.indexOf.call(
                  this.children,
                  entry.target
                );

                if (
                  entry.isIntersecting &&
                  entry.boundingClientRect.left < viewportWidth
                ) {
                  this.setSnapIndex(entryIndex - 1);
                  return;
                }

                if (
                  !entry.isIntersecting &&
                  entry.intersectionRatio > 0 &&
                  entry.boundingClientRect.left < viewportWidth
                ) {
                  this.setSnapIndex(entryIndex);
                  return;
                }
              });
            },
            {
              root: this.root,
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

                if (this.activeSnapIndex === null || !entry.rootBounds) return;

                if (
                  entry.boundingClientRect.left <=
                    entry.rootBounds.left +
                      entry.boundingClientRect.width * 0.01 &&
                  entry.boundingClientRect.right >=
                    entry.rootBounds.left +
                      entry.boundingClientRect.width * 0.01
                ) {
                  // If first child is snapping left
                  if (
                    Math.abs(
                      entry.rootBounds.left -
                        (entry.boundingClientRect.left +
                          entry.boundingClientRect.width / 2)
                    ) >
                    this.firstChild.offsetLeft -
                      firstChildStyles.marginLeft +
                      this.root.scrollLeft
                  ) {
                    return;
                  }

                  const entryIndex = Array.prototype.indexOf.call(
                    this.children,
                    entry.target
                  );
                  // console.log(entryIndex);
                  this.setSnapIndex(entryIndex);
                  return;
                }
              });
            },
            {
              root: this.root,
              rootMargin: `0px 0px 0px -50%`,
              threshold: [0.49, 0.51],
            }
          );
      }
    };

    // root.addEventListener('scroll', handleScrolling);

    Array.from(this.root.children).forEach((child) => {
      this.activeSnapObserver?.observe(child);
    });

    window.addEventListener('resize', this.onResizeWithDebounce);
  };
}
