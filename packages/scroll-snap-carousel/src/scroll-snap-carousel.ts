import { scrollTo, dragToScroll as _dragToScroll } from './';

export default class ScrollSnapCarousel {
  constructor(
    root: HTMLDivElement,
    { dragToScroll = true }: { dragToScroll?: boolean }
  ) {
    this.el = root;
    this.scrollTo = (index) => scrollTo({ root, index });

    if (dragToScroll) _dragToScroll({ root });

    // Don't re-instantiate over an existing one
    if (ScrollSnapCarousel.instances.has(this.el)) {
      return;
    }

    this.init();
  }

  el: HTMLDivElement;
  scrollTo: (element: number) => void;

  static instances = new WeakMap();

  init() {
    // Save a reference to the instance, so we know this DOM node has already been instancied
    ScrollSnapCarousel.instances.set(this.el, this);
  }

  /**
   * Delete ScrollSnapCarousel instance from DOM element
   */
  unmount() {
    ScrollSnapCarousel.instances.delete(this.el);
  }
}
