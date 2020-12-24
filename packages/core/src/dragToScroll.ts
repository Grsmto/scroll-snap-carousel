import { isTouchDevice, mapItem } from './utils';
import { scrollTo } from './scrollTo';

// as found on stackoverflow: https://stackoverflow.com/a/19277804
const getClosest = (l: number[], t: number): number =>
  l.reduce((p, c) => (Math.abs(c - t) < Math.abs(p - t) ? c : p));

const getElementPositionX = (
  viewport: HTMLElement,
  element: HTMLElement
): number => {
  const item = mapItem({ element, viewport });
  return item.left - (viewport.offsetWidth / 2 - item.width / 2);
};

const getElementPositionY = (
  viewport: HTMLElement,
  element: HTMLElement
): number => {
  const item = mapItem({ element, viewport });
  return item.top - (viewport.offsetHeight / 2 - item.height / 2);
};

const dragThreshold = 2; // distance moved before isDragged is set to true and click on children is disabled

interface Styles extends CSSStyleDeclaration {
  scrollSnapType: string;
}

export const dragToScroll = ({
  root,
  disabled = false,
}: {
  root: HTMLDivElement;
  disabled?: boolean;
}) => {
  let elementPositionsX: number[] = [];
  let elementPositionsY: number[] = [];

  let timeout: number | null = null;
  let isDragging = false;
  const setIsDragging = (value: boolean) => (isDragging = value);

  let isDown = false;
  let startX = 0;
  let startY = 0;
  let slideX = 0;
  let slideY = 0;
  let originalScrollSnapType: string | undefined = undefined;

  // used to determine whether slider is scrolling. After scrolling ends, reset css classes
  const handleScrolling = () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (!root) return;

      root.removeEventListener('scroll', handleScrolling);

      setIsDragging(false);
      // Safari resets scroll position when removing the css class, manually
      // setting the scroll property afterwards seems to fix the problem
      // without flashing
      const currentX = root.scrollLeft;
      const currentY = root.scrollTop;

      root.classList.remove('snaplist_drag');
      root.scrollLeft = currentX;
      root.scrollTop = currentY;
    }, 50) as any;
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (!root) return;
    event.preventDefault();
    isDown = true;
    startX = event.pageX - root.offsetLeft;
    slideX = root.scrollLeft;
    startY = event.pageY - root.offsetTop;
    slideY = root.scrollTop;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!root) return;
    if (!isDown) return;

    const distanceMoved = Math.abs(startX - (event.pageX - root.offsetLeft));

    if (distanceMoved < dragThreshold) return; // skip further action, when not mouse movement is below threshold, thus no drag detected
    if (timeout) clearTimeout(timeout);
    if (!isDragging) {
      setIsDragging(true);
      const snapListStyles = window.getComputedStyle(root) as Styles;
      if (originalScrollSnapType === undefined) {
        originalScrollSnapType = snapListStyles.scrollSnapType.toString();
      }
    }
    root.classList.add('snaplist_drag');

    const x = event.pageX - root.offsetLeft;
    const displaceX = x - startX;

    root.scrollLeft = slideX - displaceX;

    const y = event.pageY - root.offsetTop;
    const displaceY = y - startY;

    root.scrollTop = slideY - displaceY;
  };

  const handleMouseUp = () => {
    if (!root) return;

    isDown = false;

    if (!isDragging) return;

    root.addEventListener('scroll', handleScrolling);

    if (originalScrollSnapType === 'none') return;

    const dragEndPositionX = root.scrollLeft;
    const dragEndPositionY = root.scrollTop;
    const scrollTargetX = getClosest(elementPositionsX, dragEndPositionX);
    const scrollTargetY = getClosest(elementPositionsY, dragEndPositionY);

    const targetIndex =
      scrollTargetX > 0
        ? elementPositionsX.indexOf(scrollTargetX)
        : elementPositionsY.indexOf(scrollTargetY);

    scrollTo({ root, index: targetIndex });
  };

  const handleClick = (event: MouseEvent) => {
    // we need this to prevent click events being fired on children
    if (!isDragging) return;
    event.stopPropagation();
    setIsDragging(false);
  };

  const registerEventListeners = () => {
    if (!root) return;
    root.addEventListener('mousedown', handleMouseDown);
    root.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const removeEventListeners = () => {
    if (!root) return;
    root.removeEventListener('mousedown', handleMouseDown);
    root.removeEventListener('click', handleClick);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const init = () => {
    // skip on touch devices
    if (!root || isTouchDevice() || disabled) return;

    const children = root.children;

    elementPositionsX = Array.from(children).map((element) =>
      getElementPositionX(root, element as HTMLElement)
    );
    elementPositionsY = Array.from(children).map((element) =>
      getElementPositionY(root, element as HTMLElement)
    );

    registerEventListeners();
  };

  init();

  return {
    isDragging,
    disable: removeEventListeners,
    enable: registerEventListeners,
  };
};
