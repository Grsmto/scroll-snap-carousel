import React, { useRef } from 'react';
import { useDragToScroll } from '@snap-carousel/react';
import '@snap-carousel/core/dist/styles.css';

const cards = [
  { title: 'Card 1', content: 'This is the first card content' },
  { title: 'Card 2', content: 'This is the second card content' },
  { title: 'Card 3', content: 'This is the third card content' }
];

export function HookBasedCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  useDragToScroll({ ref });

  return (
    <div 
      ref={ref}
      className="flex overflow-x-auto snap-x snap-mandatory w-full gap-4 pb-4"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-80 snap-start bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.content}</p>
        </div>
      ))}
    </div>
  );
}