import React, { useCallback, useRef } from 'react';
import type { ElementType } from 'react';

import { useActiveSnap } from './useActiveSnap';
import { useDragToScroll } from './useDragToScroll';
import { useScroll } from './useScroll';
import { PolymorphicRef, useMergedRefs } from './utils';

type State = ReturnType<typeof useSnapCarousel>;

interface Props<T extends ElementType> {
  children?: React.ReactNode;
  className?: string;
  tag?: T;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  onScrollEnd?: () => void;
  state?: State;
}

export const useSnapCarousel = () => {
  const elRef = useRef<any>(null);
  const activeIndex = useActiveSnap({ ref: elRef });

  return {
    index: activeIndex,
    elRef,
  };
};

export const SnapCarousel = React.forwardRef(
  <T extends ElementType = 'div'>(
    {
      children,
      tag,
      index,
      defaultIndex,
      onIndexChange,
      onScrollEnd,
      className,
      state,
      ...otherProps
    }: Props<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const RootTag = tag || 'div';
    const elRef = state?.elRef || useRef<any>(null);
    const mergedRef = useMergedRefs([elRef, ref]);
    const scrollTo = useScroll({ ref: elRef, onScrollEnd });
    const activeIndex = useActiveSnap({ ref: elRef });

    useDragToScroll({ ref: elRef });

    React.useEffect(() => {
      if (typeof index !== 'undefined') scrollTo(index);
    }, [index]);

    React.useEffect(() => {
      if (typeof defaultIndex !== 'undefined') scrollTo(defaultIndex, 0);
    }, [defaultIndex]);

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

type CommonProps<T extends ElementType> = {
  children?: React.ReactNode;
  className?: string;
  tag?: T;
  activeIndex?: number;
  state?: State;
};

interface IndicatorProps<T extends ElementType> extends CommonProps<T> {
  index: number;
}

export const SnapCarouselIndicator = React.forwardRef(
  <T extends ElementType = 'button'>(
    {
      tag,
      index,
      activeIndex,
      className = '',
      state,
      ...otherProps
    }: IndicatorProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const RootTag = tag || 'button';
    const elRef = state?.elRef || useRef<any>(null);
    const scrollTo = useScroll({ ref: elRef });
    const _activeIndex =
      typeof activeIndex === 'number'
        ? activeIndex
        : typeof state?.index === 'number'
        ? state.index
        : undefined;

    const handleClick = useCallback(() => {
      scrollTo(index);
    }, [index]);

    return (
      <RootTag
        className={`${index === _activeIndex ? ' active' : ''}${
          className ? ' ' + className : ''
        }`}
        ref={ref}
        onClick={handleClick}
        {...otherProps}
      />
    );
  }
);

export const SnapCarouselNavPrev = React.forwardRef(
  <T extends ElementType = 'button'>(
    {
      tag,
      children,
      activeIndex,
      className = '',
      state,
      ...otherProps
    }: CommonProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const RootTag = tag || 'button';
    const elRef = state?.elRef || useRef<any>(null);
    const scrollTo = useScroll({ ref: elRef });
    const _activeIndex =
      typeof activeIndex === 'number'
        ? activeIndex
        : typeof state?.index === 'number'
        ? state.index
        : undefined;

    const handleClick = useCallback(() => {
      if (typeof _activeIndex === 'undefined') return;
      scrollTo(_activeIndex - 1);
    }, [_activeIndex]);

    return (
      <RootTag
        className={`${className ? ' ' + className : ''}`}
        ref={ref}
        onClick={handleClick}
        disabled={_activeIndex === 0}
        aria-hidden={_activeIndex === 0}
        aria-label="Previous"
        {...otherProps}
      >
        {children}
      </RootTag>
    );
  }
);

export const SnapCarouselNavNext = React.forwardRef(
  <T extends ElementType = 'button'>(
    {
      tag,
      children,
      activeIndex,
      className = '',
      state,
      ...otherProps
    }: CommonProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const RootTag = tag || 'button';
    const elRef = state?.elRef || useRef<any>(null);
    const scrollTo = useScroll({ ref: elRef });
    const _activeIndex =
      typeof activeIndex === 'number'
        ? activeIndex
        : typeof state?.index === 'number'
        ? state.index
        : undefined;

    const handleClick = useCallback(() => {
      if (typeof _activeIndex === 'undefined') return;
      scrollTo(_activeIndex + 1);
    }, [_activeIndex]);

    const length = elRef.current?.children.length;

    return (
      <RootTag
        className={`${className ? ' ' + className : ''}`}
        ref={ref}
        onClick={handleClick}
        disabled={_activeIndex === length - 1}
        aria-hidden={_activeIndex === length - 1}
        aria-label="Next"
        {...otherProps}
      >
        {children}
      </RootTag>
    );
  }
);
