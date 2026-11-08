import { mapItem, mapStyles } from './utils';
import { smoothScroll } from './smoothScroll';

export const getSnapTargetX = (
  $viewport: HTMLElement,
  element: HTMLElement
): number => {
  const elements = $viewport.children;
  const firstElement = elements[0] as HTMLElement;
  const viewportStyles = mapStyles($viewport);
  const viewport = {
    offsetLeft: $viewport.offsetLeft,
    offsetTop: $viewport.offsetTop,
    width: $viewport.offsetWidth,
    paddingLeft: mapStyles(firstElement).paddingLeft,
    paddingRight: mapStyles(elements[elements.length - 1]).paddingRight,
    scrollPaddingLeft: viewportStyles.scrollPaddingLeft || 0,
    scrollPaddingRight: viewportStyles.scrollPaddingRight || 0,
    scrollWidth: $viewport.scrollWidth,
  };

  const item = mapItem({ element, viewport });

  let left = 0;

  switch (item.snapAlign) {
    case 'start':
      left = item.left - viewport.paddingLeft - viewport.scrollPaddingLeft;
      break;
    case 'end':
      left =
        item.left -
        (viewport.width - item.width) +
        viewport.paddingRight +
        viewport.scrollPaddingRight;
      break;
    case 'center':
      left =
        item.left -
        (viewport.width - item.width) / 2 -
        viewport.scrollPaddingLeft / 2;
      break;
  }

  return Math.min(Math.max(0, left), viewport.scrollWidth - viewport.width);
};

export const scrollTo = ({
  root,
  index,
  duration = 350,
  onScrollEnd,
}: {
  root: any;
  index: number;
  duration?: number;
  onScrollEnd?: () => void;
}) => {
  const getScrollFor = (
    index: number
  ):
    | {
        left: number;
        top: number;
      }
    | undefined => {
    const $viewport: HTMLElement = root;
    if (!$viewport) return;

    const elements = $viewport.children;
    const element =
      index >= 0 && elements.length ? (elements[index] as HTMLElement) : null;

    if (!element) return;

    const firstElement = elements[0] as HTMLElement;

    const viewportStyles = mapStyles($viewport);
    const viewport = {
      left: $viewport.scrollLeft,
      width: $viewport.offsetWidth,
      right: $viewport.scrollLeft + $viewport.offsetWidth,
      top: $viewport.scrollTop,
      height: $viewport.offsetHeight,
      bottom: $viewport.scrollTop + $viewport.offsetHeight,
      offsetLeft: $viewport.offsetLeft,
      offsetTop: $viewport.offsetTop,
      paddingLeft: mapStyles(firstElement).paddingLeft,
      paddingRight: mapStyles(elements[elements.length - 1]).paddingRight,
      paddingTop: mapStyles(firstElement).paddingTop,
      paddingBottom: mapStyles(elements[elements.length - 1]).paddingBottom,
      scrollPaddingLeft: viewportStyles.scrollPaddingLeft || 0,
      scrollPaddingRight: viewportStyles.scrollPaddingRight || 0,
      scrollPaddingTop: viewportStyles.scrollPaddingTop || 0,
      scrollPaddingBottom: viewportStyles.scrollPaddingBottom || 0,
      scrollWidth: $viewport.scrollWidth,
      scrollHeight: $viewport.scrollHeight,
    };

    const item = mapItem({ element, viewport });
    const left = getSnapTargetX($viewport, element);

    let target = { left, top: 0 };

    switch (item.snapAlign) {
      case 'start':
        target = {
          left,
          top:
            item.top -
            item.paddingTop -
            viewport.paddingTop -
            viewport.scrollPaddingTop,
        };
        break;
      case 'end':
        target = {
          left,
          top:
            item.top -
            (viewport.height - item.height) +
            viewport.paddingBottom +
            viewport.scrollPaddingBottom,
        };
        break;
      case 'center':
        target = {
          left,
          top:
            item.top -
            (viewport.height - item.height) / 2 -
            viewport.scrollPaddingTop / 2,
        };
        break;
    }

    return {
      left: Math.min(
        Math.max(0, target.left),
        viewport.scrollWidth - viewport.width
      ),
      top: Math.min(
        Math.max(0, target.top),
        viewport.scrollHeight - viewport.height
      ),
    };
  };

  const goTo = (index: number) => {
    const scrollTarget = getScrollFor(index);

    if (scrollTarget) {
      return smoothScroll(root, scrollTarget, duration, onScrollEnd);
    }

    return;
  };

  const cancel = goTo(index);

  return { cancel };
};
