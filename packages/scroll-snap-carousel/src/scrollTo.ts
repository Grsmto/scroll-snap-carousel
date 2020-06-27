import { mapItem, mapStyles } from './utils';

const normalize = (
  value: number,
  { min, max }: { min: number; max: number }
) => {
  return Math.min(max, Math.max(min, value));
};

export const scrollTo = ({ root, index }: { root: any; index: number }) => {
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

    let target = { left: 0, top: 0 };
    switch (item.snapAlign) {
      case 'start':
        target = {
          left:
            item.left -
            item.paddingLeft -
            viewport.paddingLeft -
            viewport.scrollPaddingLeft,
          top:
            item.top -
            item.paddingTop -
            viewport.paddingTop -
            viewport.scrollPaddingTop,
        };
        break;
      case 'end':
        target = {
          left:
            item.left -
            (viewport.width - item.width) +
            viewport.paddingRight +
            viewport.scrollPaddingRight,
          top:
            item.top -
            (viewport.height - item.height) +
            viewport.paddingBottom +
            viewport.scrollPaddingBottom,
        };
        break;
      case 'center':
        target = {
          left:
            item.left -
            (viewport.width - item.width) / 2 -
            viewport.scrollPaddingLeft / 2,
          top:
            item.top -
            (viewport.height - item.height) / 2 -
            viewport.scrollPaddingTop / 2,
        };
        break;
    }

    const maxLeftScroll = viewport.scrollWidth - viewport.width;
    const maxTopScroll = viewport.scrollHeight - viewport.height;

    return {
      left: normalize(target.left, { min: 0, max: maxLeftScroll }),
      top: normalize(target.top, { min: 0, max: maxTopScroll }),
    };
  };

  const goTo = (index: number) => {
    const scrollTarget = getScrollFor(index);

    if (scrollTarget) {
      root.scrollTo({
        left: scrollTarget.left,
        top: scrollTarget.top,
        behavior: 'smooth',
      });
    }
  };

  return goTo(index);
};
