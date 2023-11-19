import render from '@testing-library/react';
import App from './App';

it('has a routes element', () => {
  const view = render(<App />);
  expect(view).toBeTruthy();
});