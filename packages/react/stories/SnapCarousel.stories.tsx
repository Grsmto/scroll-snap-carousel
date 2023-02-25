import React from 'react';
import {
  useSnapCarousel,
  SnapCarousel,
  SnapCarouselIndicator,
  SnapCarouselNavPrev,
  SnapCarouselNavNext,
} from '@snap-carousel/react';
import '@snap-carousel/react/src/styles.css';

import './SnapCarousel.css';

import { Chevron } from './icons/Chevron';

const Carousel = ({ className }) => {
  const testRef = React.useRef();
  const state = useSnapCarousel();
  let slidesLength = 10;
  let slides = [];

  for (let index = 0; index < slidesLength; index++) {
    slides.push(`Slide ${index + 1}`);
  }

  return (
    <div className={`SnapCarousel-story ${className}`}>
      <div className="carousel">
        <SnapCarousel state={state} defaultIndex={9} ref={testRef}>
          {slides.map((slide) => (
            <div className="slide" key={slide}>
              {slide}
            </div>
          ))}
        </SnapCarousel>
        <div className="carousel-indicator">
          {slides.map((_, i) => (
            <SnapCarouselIndicator
              key={i}
              className="carousel-indicator__dot"
              index={i}
              state={state}
            />
          ))}
        </div>
        <div className="carousel-nav">
          <SnapCarouselNavPrev
            state={state}
            className="carousel-nav__btn--previous"
          >
            <Chevron />
          </SnapCarouselNavPrev>
          <SnapCarouselNavNext
            state={state}
            className="carousel-nav__btn--next"
          >
            <Chevron />
          </SnapCarouselNavNext>
        </div>
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
const Template = (args) => <Carousel {...args} />;

export const FullWidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullWidth.args = {
  primary: true,
  className: 'full-width',
};
