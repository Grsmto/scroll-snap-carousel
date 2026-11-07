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

const createCarousel = (slideCount: number, slideWidth = 300) => {
  const root = document.createElement('div');

  defineLayout(root, {
    offsetLeft: 0,
    offsetWidth: slideWidth,
    clientWidth: slideWidth,
    scrollWidth: slideWidth * slideCount,
  });

  for (let index = 0; index < slideCount; index++) {
    const slide = document.createElement('div');

    slide.style.scrollSnapAlign = 'start';
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
});

describe('observeScrollProgress', () => {
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
});
