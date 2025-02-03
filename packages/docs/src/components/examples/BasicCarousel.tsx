import React from 'react';
import { SnapCarousel } from '@snap-carousel/react';
import '@snap-carousel/react/dist/styles.css';

const images = [
  'https://picsum.photos/id/1018/600/400',
  'https://picsum.photos/id/1015/600/400',
  'https://picsum.photos/id/1019/600/400'
];

export function BasicCarousel() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <SnapCarousel>
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </SnapCarousel>
    </div>
  );
}