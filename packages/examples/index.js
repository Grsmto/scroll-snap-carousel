import React from 'react';
import ReactDOM from 'react-dom';
import {
  useDragToScroll,
  useScroll,
  useActiveSnap,
} from 'react-scroll-snap-carousel';
import 'scroll-snap-carousel/dist/styles.css';

const getPageIndex = (index, length, offset) => {
  return Math.max(0, index - offset);
};

const Examples = () => {
  const ref = React.useRef();
  const [offsetItems, setOffsetItems] = React.useState(0);

  let slidesLength = 10;
  let slides = [];

  for (let index = 0; index < slidesLength; index++) {
    slides.push(`Slide ${index + 1}`);
  }

  React.useEffect(() => {
    const lg = window.matchMedia('(min-width: 641px)');
    const md = window.matchMedia('(max-width: 640px)');
    const sm = window.matchMedia('(max-width: 320px)');

    lg.addListener(() => {
      setOffsetItems(1);
    });
    md.addListener(() => {
      setOffsetItems(0);
    });
    sm.addListener(() => {
      setOffsetItems(0);
    });

    if (lg.matches) setOffsetItems(1);
    if (md.matches) setOffsetItems(0);
    if (sm.matches) setOffsetItems(0);
  }, []);

  React.useEffect(() => {
    ref.current.scrollLeft = 0;
  }, []);

  useDragToScroll({ ref });

  const scrollTo = useScroll({ ref });
  const index = useActiveSnap({ ref });
  const pages = slides.slice(offsetItems * 2, slides.length);

  const pageIndex = getPageIndex(index, slides.length, offsetItems);

  console.log('index: ', index);
  console.log('pageIndex: ', pageIndex);
  console.log('offsetItems: ', offsetItems);

  const handlePrevious = React.useCallback(() => {
    scrollTo(index - 1);
  }, [index]);

  const handleNext = React.useCallback(() => {
    scrollTo(index + 1);
  }, [index]);

  return (
    <div>
      <div ref={ref} className="carousel-container">
        {slides.map((slide) => (
          <div className="slide" key={slide}>
            {slide}
          </div>
        ))}
      </div>
      <div className="carousel-indicator">
        {pages.map((_, i) => (
          <div
            key={i}
            className={`carousel-indicator__dot ${
              pageIndex === i ? 'active' : ''
            }`}
          />
        ))}
      </div>
      <div className="">
        <button onClick={handlePrevious} disabled={pageIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={pageIndex === pages.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<Examples />, document.getElementById('root'));
