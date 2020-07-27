import React from 'react';
import ReactDOM from 'react-dom';
import { useDragToScroll, useScroll } from 'react-scroll-snap-carousel';
import 'scroll-snap-carousel/dist/stylesdrag.css';

const Examples = () => {
  const ref = React.useRef();
  useDragToScroll({ ref });

  return (
    <div ref={ref} className="carousel-container">
      <div className="slide">Content</div>
      <div className="slide">Content</div>
      <div className="slide">Content</div>
      <div className="slide">Content</div>
      <div className="slide">Content</div>
      <div className="slide">Content</div>
      <div className="slide">Content</div>
      <div className="slide">Content</div>
    </div>
  );
};

ReactDOM.render(<Examples />, document.getElementById('root'));
