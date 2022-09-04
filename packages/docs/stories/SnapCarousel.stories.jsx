import React from 'react';
import { SnapCarousel } from '@snap-carousel/react';
import '@snap-carousel/react/src/styles.css';

import './SnapCarousel.css';

const Carousel = ({ className }) => {
  let slidesLength = 10;
  let slides = [];

  for (let index = 0; index < slidesLength; index++) {
    slides.push(`Slide ${index + 1}`);
  }

  return (
    <div className={`SnapCarousel-story ${className}`}>
      <SnapCarousel>
        {slides.map((slide) => (
          <div className="slide" key={slide}>
            {slide}
          </div>
        ))}
      </SnapCarousel>
      {/* <div className="carousel-indicator">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`carousel-indicator__dot ${index === i ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="">
        <button onClick={handlePrevious} disabled={index === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={index === slides.length - 1}>
          Next
        </button>
      </div> */}
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
