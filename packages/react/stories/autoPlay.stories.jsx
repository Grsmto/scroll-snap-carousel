import React, { useRef, useState, useCallback } from 'react';
import { SnapCarousel } from '@snap-carousel/react';
import '@snap-carousel/react/src/styles.css';

import './SnapCarousel.css';

const Carousel = ({ className }) => {
  const carouselInterval = useRef();
  const [index, setIndex] = useState(0);
  const [isScrolling, setScrolling] = useState(false);

  let slidesLength = 6;
  let slides = [];

  for (let index = 0; index < slidesLength; index++) {
    slides.push(`Slide ${index + 1}`);
  }

  const handleInterval = useCallback(() => {
    setScrolling(true);
    setIndex(index + 1 >= slidesLength ? 0 : index + 1);
  }, [index]);

  const handleIndexChange = useCallback(
    (_index) => {
      if (!isScrolling) setIndex(_index);
    },
    [index]
  );

  const handleScrollEnd = useCallback(() => {
    setScrolling(false);
  }, [index]);

  React.useEffect(() => {
    carouselInterval.current = window.setInterval(handleInterval, 2000);

    return () => {
      clearInterval(carouselInterval.current);
    };
  }, [handleInterval]);

  return (
    <div className={`autoPlay-story ${className}`}>
      <div className="carousel">
        <SnapCarousel
          onIndexChange={handleIndexChange}
          index={index}
          onScrollEnd={handleScrollEnd}
        >
          {slides.map((_, i) => (
            <div className="slide" key={i}>
              <img src={`/images/${i}.jpg`} width={400} height={500} />
            </div>
          ))}
        </SnapCarousel>
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
};
