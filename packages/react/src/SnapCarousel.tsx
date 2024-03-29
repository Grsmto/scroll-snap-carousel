import React, { ElementType, useRef } from 'react';

import { useDragToScroll } from './useDragToScroll';

const useMergedRefs = (refs: React.DependencyList) =>
  React.useCallback((current) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(current);
      } else if (ref && !Object.isFrozen(ref)) {
        ref.current = current;
      }
    });
  }, refs);

export type PolymorphicRef<
  C extends React.ElementType
> = React.ComponentPropsWithRef<C>['ref'];

type Props<T extends ElementType> = {
  children?: React.ReactNode;
  tag?: T;
};

export const SnapCarousel = React.forwardRef(
  <T extends ElementType = 'div'>(
    { children, tag, ...otherProps }: Props<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const RootTag = tag || 'div';
    const elRef = useRef<any>(null);
    const contentNodeRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRefs([elRef, ref]);

    useDragToScroll({ ref: elRef });

    return (
      <RootTag
        className="snap-carousel-container"
        ref={mergedRef}
        {...otherProps}
      >
        <div className="snap-carousel-inner" ref={contentNodeRef}>
          {children}
        </div>
      </RootTag>
    );
  }
);

SnapCarousel.displayName = 'SnapCarousel';
