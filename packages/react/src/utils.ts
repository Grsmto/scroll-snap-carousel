import React from 'react';

export const useMergedRefs = (refs: React.DependencyList) =>
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
