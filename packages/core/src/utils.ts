export const mergeStyles = (...classnames: (string | null | undefined)[]) =>
  classnames.filter(Boolean).join(' ');

const extractStyleProperty = (
  property: keyof CSSStyleDeclaration,
  styles: CSSStyleDeclaration
): any => styles[property] || '';

export const getStyles = (
  $item: HTMLElement | Element,
  props: Array<keyof CSSStyleDeclaration>
) => {
  const styles = window.getComputedStyle($item) as CSSStyleDeclaration;
  return props.reduce((acc: { [key: string]: number }, curr) => {
    acc[curr as string] = parseInt(extractStyleProperty(curr, styles)) || 0;
    return acc;
  }, {});
};

export const mapStyles = ($item: HTMLElement | Element) => {
  const styles = window.getComputedStyle($item) as CSSStyleDeclaration;

  return {
    paddingLeft: parseInt(extractStyleProperty('paddingLeft', styles)),
    paddingRight: parseInt(extractStyleProperty('paddingRight', styles)),
    paddingTop: parseInt(extractStyleProperty('paddingTop', styles)),
    paddingBottom: parseInt(extractStyleProperty('paddingBottom', styles)),
    snapAlign: extractStyleProperty('scrollSnapAlign', styles).split(' ')[0],
    scrollPaddingLeft: parseInt(
      extractStyleProperty('scrollPaddingLeft', styles)
    ),
    scrollPaddingRight: parseInt(
      extractStyleProperty('scrollPaddingRight', styles)
    ),
    scrollPaddingTop: parseInt(
      extractStyleProperty('scrollPaddingTop', styles)
    ),
    scrollPaddingBottom: parseInt(
      extractStyleProperty('scrollPaddingBottom', styles)
    ),
  };
};

export const mapItem = ({
  element,
  viewport,
}: {
  element: HTMLElement;
  viewport: { offsetLeft: number; offsetTop: number };
}) => {
  const { paddingLeft, paddingRight, paddingTop, paddingBottom, snapAlign } =
    mapStyles(element);
  const left = element.offsetLeft - viewport.offsetLeft + paddingLeft;
  const width = element.offsetWidth - paddingLeft - paddingRight;
  const right = left + width;
  const top = element.offsetTop - viewport.offsetTop + paddingTop;
  const height = element.offsetHeight - paddingBottom - paddingTop;
  const bottom = top + height;

  return {
    left,
    width,
    right,
    top,
    height,
    bottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    snapAlign,
  };
};

export const isTouchDevice = () =>
  !!(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch &&
        typeof document !== 'undefined' &&
        document instanceof window.DocumentTouch))
  ) ||
  !!(
    typeof navigator !== 'undefined' && // @ts-expect-error// @ts-expect-error
    (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
  );

export const debounceHOF = (callback: () => void, ms: number) => {
  let timeout: any;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      callback();
    }, ms);
  };
};
