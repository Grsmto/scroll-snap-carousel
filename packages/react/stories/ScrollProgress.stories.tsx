import React from 'react';
import {
  SnapCarousel,
  useScroll,
  useScrollProgress,
  useSnapCarousel,
} from '../src';
import '../src/styles.css';

const tabs = ['Hat', 'Sunglasses', 'Scarf'];

const TabsCarousel = () => {
  const state = useSnapCarousel();
  const scrollTo = useScroll({ ref: state.elRef });
  const tabsRef = React.useRef<HTMLDivElement>(null);

  useScrollProgress({
    ref: state.elRef,
    onProgress: (progress) =>
      tabsRef.current?.style.setProperty('--progress', String(progress)),
  });

  return (
    <div style={{ maxWidth: 400 }}>
      <SnapCarousel
        state={state}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            style={{
              flex: '0 0 100%',
              height: 200,
              scrollSnapAlign: 'start',
              display: 'grid',
              placeItems: 'center',
              background: '#eee',
            }}
          >
            {tab}
          </div>
        ))}
      </SnapCarousel>
      <div
        ref={tabsRef}
        role="tablist"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: `${100 / tabs.length}%`,
            background: '#ccc',
            transform: 'translateX(calc(var(--progress, 0) * 100%))',
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={state.index === index}
            onClick={() => scrollTo(index)}
            style={{ position: 'relative', background: 'none', border: 0 }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default {
  title: 'ScrollProgress',
  component: TabsCarousel,
};

export const Tabs = () => <TabsCarousel />;
