import React from 'react';
import { render } from '@testing-library/react';
import { SnapCarousel } from './SnapCarousel';

test('renders without crashing', () => {
  const { container } = render(
    <SnapCarousel>
      {[...Array(5)].map((_, i) => (
        <p key={i}>Some content</p>
      ))}
    </SnapCarousel>
  );
  expect(container.firstChild).toMatchSnapshot();
});
