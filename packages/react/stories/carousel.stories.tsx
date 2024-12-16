import React, { FC } from 'react';
import { expect, jest } from '@storybook/jest';
import type { StoryFn } from '@storybook/react';
import { userEvent, waitFor } from '@storybook/testing-library';
import {
  useDragToScroll,
  useScroll,
  useActiveSnap,
} from '../src';
import '../src/styles.css';
import { Chevron } from './icons/Chevron';

import './carousel.css';

const Carousel: FC<{
  className: string;
  onChange: (index: number) => void;
}> = ({ className, onChange }) => {
  // const [visibleSlides, setVisibleSlides] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useDragToScroll({ ref });

  const scrollTo = useScroll({ ref });
  const index = useActiveSnap({ ref });

  // const index = 0;
  const slides = Array.from(new Array(6));

  React.useEffect(() => {
    onChange(index);
  }, [index, onChange]);

  const handlePrevious = React.useCallback(() => {
    scrollTo(index - 1);
  }, [index]);

  const handleNext = React.useCallback(() => {
    scrollTo(index + 1);
  }, [index]);

  // React.useEffect(() => {
  //   const slideWidth = 400;

  //   if (!ref.current) return;
  //   console.log(ref.current.scrollWidth);
  //   setVisibleSlides(
  //     Math.ceil(
  //       (ref.current.scrollWidth - ref.current.offsetWidth) / slideWidth
  //     ) + 1
  //   );
  // }, []);

  return (
    <div className={`carousel-story ${className}`}>
      <div className="carousel">
        <div ref={ref} className="carousel-container">
          {slides.map((_, i) => (
            <div className="slide" key={i}>
              <img src={`/images/${i}.jpg`} width={400} height={500} />
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <button
            className="carousel-nav__btn--previous"
            onClick={handlePrevious}
            disabled={index === 0}
            aria-hidden={index === 0}
            aria-label="Previous"
          >
            <Chevron />
          </button>
          <button
            className="carousel-nav__btn--next"
            onClick={handleNext}
            disabled={index === slides.length - 1}
            aria-hidden={index === 0}
            aria-label="Next"
          >
            <Chevron />
          </button>
        </div>
      </div>
      <div className="carousel-indicator">
        {/* {Array.from(new Array(visibleSlides)).map((_, i) => ( */}
        {slides.map((_, i) => (
          <div
            key={i}
            className={`carousel-indicator__dot ${index === i ? 'active' : ''}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  // title: 'Example/Carousel',
  component: Carousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<any> = (args) => <Carousel {...args} />;

export const FullWidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullWidth.args = {
  primary: true,
  className: 'full-width',
  onChange: () => {},
};

export const Thumbnails = Template.bind({});
Thumbnails.args = {
  className: 'thumbnails',
  onChange: jest.fn(),
};

Thumbnails.play = async ({ args, canvasElement }) => {
  const nextBtn = canvasElement.querySelector('.carousel-nav__btn--next');

  userEvent.click(nextBtn);

  await waitFor(() =>
    expect(
      canvasElement.getElementsByClassName('.carousel-indicator__dot.active')
    ).toBeDefined()
  );

  expect(args.onChange).toHaveBeenCalled();
};

export const WithPaddingParent = Template.bind({});
WithPaddingParent.args = {
  className: 'with-padding',
  onChange: () => {},
};

export const WithPaddingPseudoElement = Template.bind({});
WithPaddingPseudoElement.args = {
  className: 'with-padding-child',
  onChange: () => {},
};

export const WithAlignStart = Template.bind({});
WithAlignStart.args = {
  className: 'with-align-start',
  onChange: () => {},
};

export const WithAlignEnd = Template.bind({});
WithAlignEnd.args = {
  className: 'with-align-end',
  onChange: () => {},
};
