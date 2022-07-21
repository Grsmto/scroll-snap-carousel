import React, { FC } from 'react';
import { expect } from '@storybook/jest';
import type { ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import {
  useDragToScroll,
  useScroll,
  useActiveSnap,
} from '@snap-carousel/react';
import '@snap-carousel/react/dist/styles.css';

import './carousel.css';

const Carousel: FC<{
  className: string;
  onChange: (index: number) => void;
}> = ({ className, onChange }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  let slidesLength = 10;
  let slides = [];

  for (let index = 0; index < slidesLength; index++) {
    slides.push(`Slide ${index + 1}`);
  }

  useDragToScroll({ ref });

  const scrollTo = useScroll({ ref });
  const index = useActiveSnap({ ref });
  // const index = 0;

  React.useEffect(() => {
    onChange(index);
  }, [index, onChange]);

  const handlePrevious = React.useCallback(() => {
    scrollTo(index - 1);
  }, [index]);

  const handleNext = React.useCallback(() => {
    scrollTo(index + 1);
  }, [index]);

  return (
    <div className={className}>
      <div ref={ref} className="carousel-container">
        {slides.map((slide) => (
          <div className="slide" key={slide}>
            {slide}
          </div>
        ))}
      </div>
      <div className="carousel-indicator">
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
const Template: ComponentStory<any> = (args) => <Carousel {...args} />;

export const FullWidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullWidth.args = {
  primary: true,
  className: 'full-width',
  argTypes: {
    onChange: { action: true },
  },
};

export const Thumbnails = Template.bind({});
Thumbnails.args = {
  className: 'thumbnails',
  onChange: () => {},
};

Thumbnails.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const nextBtn = canvas.getByText('Next', {
    selector: 'button',
  });

  await userEvent.click(nextBtn);

  await waitFor(() =>
    expect(
      canvasElement.getElementsByClassName('.carousel-indicator__dot.active')
    ).toBeDefined()
  );
  await waitFor(() => expect(args.onChange).toHaveBeenCalled());
};
