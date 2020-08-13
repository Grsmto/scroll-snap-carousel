import React from 'react';
import ReactDOM from 'react-dom';
import {
  useDragToScroll,
  useScroll,
  useActiveSnap,
} from 'react-scroll-snap-carousel';
import 'scroll-snap-carousel/dist/styles.css';

const getPageIndex = (index, length) => {
  switch (index) {
    case 0:
    case 1:
      return 0;
    case length - 1:
      return length - 3;
    default:
      return index - 1;
  }
};

const Examples = () => {
  const ref = React.useRef();
  const [pages, setPages] = React.useState(2);

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
      setPages(8);
    });
    md.addListener(() => {
      setPages(10);
    });
    sm.addListener(() => {
      setPages(10);
    });

    if (lg.matches) setPages(8);
    if (md.matches) setPages(10);
    if (sm.matches) setPages(10);
  }, []);

  React.useEffect(() => {
    ref.current.scrollLeft = -9999;
  }, []);

  useDragToScroll({ ref });

  const scrollTo = useScroll({ ref });
  const index = useActiveSnap({ ref });

  const pageIndex = getPageIndex(index, slidesLength);

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
        {Array.from(Array(pages)).map((_, i) => (
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
