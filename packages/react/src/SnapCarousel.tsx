import React, { useRef } from 'react';
import type { ElementType } from 'react';

import { useActiveSnap } from './useActiveSnap';
import { useDragToScroll } from './useDragToScroll';
import { useScroll } from './useScroll';

const useMergedRefs = (refs: React.DependencyList) =>
  React.useCallback((current: any) => {
    refs.forEach((ref: any) => {
      if (typeof ref === 'function') {
        ref(current);
      } else if (ref && !Object.isFrozen(ref)) {
        ref.current = current;
      }
    });
  }, refs);

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type Props<T extends ElementType> = {
  children?: React.ReactNode;
  className?: string;
  tag?: T;
  index?: number;
  onIndexChange?: (index: number) => void;
};

export const SnapCarousel = React.forwardRef(
  <T extends ElementType = 'div'>(
    { children, tag, index, onIndexChange, className, ...otherProps }: Props<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const RootTag = tag || 'div';
    const elRef = useRef<any>(null);
    const mergedRef = useMergedRefs([elRef, ref]);
    const scrollTo = useScroll({ ref: elRef });
    const activeIndex = useActiveSnap({ ref: elRef });

    useDragToScroll({ ref: elRef });

    React.useEffect(() => {
      if (typeof index !== 'undefined') scrollTo(index);
    }, [index]);

    React.useEffect(() => {
      onIndexChange && onIndexChange(activeIndex);
    }, [activeIndex, onIndexChange]);

    return (
      <RootTag
        className={`snap-carousel-container ${className}`}
        ref={mergedRef}
        {...otherProps}
      >
        {children}
      </RootTag>
    );
  }
);

SnapCarousel.displayName = 'SnapCarousel';
