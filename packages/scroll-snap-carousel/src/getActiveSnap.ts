import { mapItem } from './utils';

const getVisibleChildren = ($viewport?: HTMLDivElement | null) => {
  if (!$viewport) return { children: [], childrenInCenter: null };
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
  let childrenInCenter = null;
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
  onChange: (index: number) => {};
}) => {
  let timeout: number | null = null;
  const children = root.children;
  let snapIndex = root.scrollLeft
    ? getVisibleChildren(root).childrenInCenter
    : 0;
  const rootWidth = root.offsetWidth;
  // Observe a 2px width rectangle in the center of the root
  const rootMargin = `0px -${rootWidth / 2 - 1}px 0px -${rootWidth / 2 - 1}px`;
  let options = {
    root,
    rootMargin,
    threshold: [0, 1],
  };
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (
          root.scrollLeft !== 0 &&
          root.scrollLeft !== root.scrollWidth - root.offsetWidth
        )
          snapIndex = Array.prototype.indexOf.call(children, entry.target);
      } else {
        observer.unobserve(entry.target);

        if (snapIndex !== null) {
          if (
            entry.rootBounds &&
            entry.boundingClientRect.right <= entry.rootBounds.left
          ) {
            // if next
            children[snapIndex + 1] &&
              observer.observe(children[snapIndex + 1]);
          } else {
            children[snapIndex - 1] &&
              observer.observe(children[snapIndex - 1]);
          }
        }
        return;
      }

      if (snapIndex) {
        triggerChange(snapIndex);
      }
    });
  }, options);

  if (snapIndex !== null) observer.observe(children[snapIndex]);

  const triggerChange = (snapIndex: number) => {
    onChange && onChange(snapIndex);
    root.dispatchEvent(
      new CustomEvent('snap-change', {
        detail: {
          snapIndex: snapIndex,
        },
      })
    );
  };

  const handleScrolling = () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (!root || snapIndex === null) return;

      if (root.scrollLeft === 0 && snapIndex !== 0) {
        observer.unobserve(children[snapIndex]);
        observer.observe(children[1]);
        snapIndex = 0;
        triggerChange(snapIndex);
        return;
      }

      if (root.scrollLeft !== 0 && snapIndex === 0) {
        snapIndex = 1;
        triggerChange(snapIndex);
        return;
      }

      if (
        root.scrollWidth === root.scrollLeft + root.offsetWidth &&
        snapIndex !== children.length - 1
      ) {
        observer.unobserve(children[snapIndex]);
        observer.observe(children[children.length - 2]);
        snapIndex = children.length - 1;
        triggerChange(snapIndex);
        return;
      }

      if (
        root.scrollWidth !== root.scrollLeft + root.offsetWidth &&
        snapIndex === children.length - 1
      ) {
        snapIndex = children.length - 2;
        triggerChange(snapIndex);
        return;
      }
    }, 50) as any;
  };

  root.addEventListener('scroll', handleScrolling);
};
