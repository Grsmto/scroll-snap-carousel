import React from 'react';
import ReactDOM from 'react-dom';
import {
  useDragToScroll,
  useScroll,
  useActiveSnap,
} from 'react-scroll-snap-carousel';
import 'scroll-snap-carousel/dist/styles.css';

const Examples = () => {
  const ref = React.useRef();
  const [slidesPerPage, setSlidesPerPage] = React.useState(2);

  let slidesLength = 10;
  let slides = [];

  for (let index = 0; index < slidesLength; index++) {
    slides.push(`Slide ${index + 1}`);
  }

  // const pagesLength = slidesLength - slidesPerPage + 1;

  React.useEffect(() => {
    const lg = window.matchMedia('(min-width: 641px)');
    const md = window.matchMedia('(max-width: 640px)');
    const sm = window.matchMedia('(max-width: 320px)');

    lg.addListener(() => {
      setSlidesPerPage(8);
    });
    md.addListener(() => {
      setSlidesPerPage(10);
    });
    sm.addListener(() => {
      setSlidesPerPage(10);
    });

    if (lg.matches) setSlidesPerPage(8);
    if (md.matches) setSlidesPerPage(10);
    if (sm.matches) setSlidesPerPage(10);
  }, []);

  React.useEffect(() => {
    ref.current.scrollLeft = 0;
  }, []);

  useDragToScroll({ ref });

  const index = useActiveSnap({ ref, snapPerPage: slidesPerPage });

  console.log(index);

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
        {Array.from(Array(slidesPerPage)).map((_, i) => (
          <div
            key={i}
            className={`carousel-indicator__dot ${index === i ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<Examples />, document.getElementById('root'));
