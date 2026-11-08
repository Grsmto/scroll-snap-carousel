import {
  getScrollProgress,
  getSnapPositionsX,
  observeScrollProgress,
} from './getScrollProgress';

const defineLayout = (
  element: HTMLElement,
  layout: Partial<Record<string, number>>
) => {
  Object.entries(layout).forEach(([key, value]) => {
    Object.defineProperty(element, key, { configurable: true, value });
  });
};

const createCarousel = (
  slideCount: number,
  slideWidth = 300,
  options: { align?: string; viewportWidth?: number } = {}
) => {
  const { align = 'start', viewportWidth = slideWidth } = options;

  const root = document.createElement('div');

  defineLayout(root, {
    offsetLeft: 0,
    offsetWidth: viewportWidth,
    clientWidth: viewportWidth,
    scrollWidth: slideWidth * slideCount,
  });

  for (let index = 0; index < slideCount; index++) {
    const slide = document.createElement('div');

    slide.style.scrollSnapAlign = align;
    slide.style.padding = '0px';
    defineLayout(slide, {
      offsetLeft: index * slideWidth,
      offsetWidth: slideWidth,
    });
    root.appendChild(slide);
  }

  document.body.appendChild(root);

  return root;
};

describe('getScrollProgress', () => {
  const positions = [0, 300, 600];

  it('returns the first index at the start', () => {
    expect(getScrollProgress(0, positions)).toBe(0);
  });

  it('interpolates between two snap positions', () => {
    expect(getScrollProgress(150, positions)).toBe(0.5);
    expect(getScrollProgress(375, positions)).toBe(1.25);
  });

  it('clamps to the last index past the end', () => {
    expect(getScrollProgress(900, positions)).toBe(2);
  });

  it('returns 0 with fewer than two snap positions', () => {
    expect(getScrollProgress(100, [0])).toBe(0);
    expect(getScrollProgress(100, [])).toBe(0);
  });

  it('skips duplicated snap positions', () => {
    expect(getScrollProgress(300, [0, 300, 300, 600])).toBe(1);
    expect(getScrollProgress(450, [0, 300, 300, 600])).toBe(2.5);
  });
});

describe('getSnapPositionsX', () => {
  it('maps start-aligned slides to their offsets', () => {
    expect(getSnapPositionsX(createCarousel(3))).toEqual([0, 300, 600]);
  });

  it('maps end-aligned slides to their snap targets', () => {
    const root = createCarousel(4, 150, { align: 'end', viewportWidth: 300 });
    const positions = getSnapPositionsX(root);

    expect(positions).toEqual([0, 0, 150, 300]);
    expect(getScrollProgress(150, positions)).toBe(2);
  });
});

describe('observeScrollProgress', () => {
  beforeEach(() => {
    if (typeof ResizeObserver !== 'undefined') return;

    (
      window as unknown as { ResizeObserver: typeof ResizeObserver }
    ).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  it('reports progress on scroll', () => {
    const root = createCarousel(2);
    const onProgress = jest.fn();
    const requestFrame = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });

    const { destroy } = observeScrollProgress({ root, onProgress });

    expect(onProgress).toHaveBeenLastCalledWith(0);

    root.scrollLeft = 120;
    root.dispatchEvent(new Event('scroll'));

    expect(onProgress).toHaveBeenLastCalledWith(0.4);

    destroy();
    root.scrollLeft = 300;
    root.dispatchEvent(new Event('scroll'));

    expect(onProgress).toHaveBeenLastCalledWith(0.4);

    requestFrame.mockRestore();
  });

  it('refreshes the second snap when slides shrink', () => {
    let notifyResize: ResizeObserverCallback | undefined;

    const resizeTarget = window as unknown as {
      ResizeObserver: typeof ResizeObserver;
    };
    const previousResizeObserver = resizeTarget.ResizeObserver;

    resizeTarget.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        notifyResize = callback;
      }

      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
    jest.useFakeTimers();

    const root = createCarousel(2);
    const onProgress = jest.fn();
    const { destroy } = observeScrollProgress({ root, onProgress });

    root.scrollLeft = 200;
    defineLayout(root, {
      offsetWidth: 200,
      clientWidth: 200,
      scrollWidth: 400,
    });
    Array.from(root.children).forEach((slide, index) => {
      defineLayout(slide as HTMLElement, {
        offsetLeft: index * 200,
        offsetWidth: 200,
      });
    });
    notifyResize!([], {} as ResizeObserver);
    jest.advanceTimersByTime(100);

    expect(onProgress).toHaveBeenLastCalledWith(1);

    destroy();
    jest.useRealTimers();
    resizeTarget.ResizeObserver = previousResizeObserver;
  });

  it('does not report progress for a resize queued before destroy', () => {
    jest.useFakeTimers();
    const root = createCarousel(2);
    const onProgress = jest.fn();

    const { destroy } = observeScrollProgress({ root, onProgress });

    window.dispatchEvent(new Event('resize'));
    destroy();
    jest.advanceTimersByTime(100);

    expect(onProgress).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  it('cancels a pending animation frame when the resize update runs', () => {
    jest.useFakeTimers();
    const root = createCarousel(2);
    const onProgress = jest.fn();
    const pending = new Map<number, FrameRequestCallback>();
    let nextFrame = 0;
    const requestFrame = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        nextFrame += 1;
        pending.set(nextFrame, callback);
        return nextFrame;
      });
    const cancelFrame = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation((id: number) => {
        pending.delete(id);
      });

    const { destroy } = observeScrollProgress({ root, onProgress });

    root.scrollLeft = 150;
    root.dispatchEvent(new Event('scroll'));

    window.dispatchEvent(new Event('resize'));
    jest.advanceTimersByTime(100);

    expect(cancelFrame).toHaveBeenCalledWith(nextFrame);
    expect(pending.size).toBe(0);
    expect(onProgress).toHaveBeenLastCalledWith(0.5);
    expect(onProgress).toHaveBeenCalledTimes(2);

    destroy();
    requestFrame.mockRestore();
    cancelFrame.mockRestore();
    jest.useRealTimers();
  });
});
