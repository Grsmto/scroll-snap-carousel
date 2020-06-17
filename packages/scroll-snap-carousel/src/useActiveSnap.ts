import { mapItem } from "./utils";

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

export const useActiveSnap = ({ root, onChange }) => {
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
        snapIndex = Array.prototype.indexOf.call(children, entry.target);
      } else {
        observer.unobserve(entry.target);

        // if next
        if (entry.boundingClientRect.right <= entry.rootBounds.left) {
          children[snapIndex + 1] && observer.observe(children[snapIndex + 1]);
        } else {
          children[snapIndex - 1] && observer.observe(children[snapIndex - 1]);
        }
        return;
      }

      onChange && onChange(snapIndex);
      root.dispatchEvent(
        new CustomEvent("snap-change", {
          detail: {
            snapIndex,
          },
        })
      );
    });
  }, options);
  observer.observe(children[snapIndex]);
};
