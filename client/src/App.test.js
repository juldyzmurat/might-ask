import render from '@testing-library/react';
import App from './App';

it('renders', () => {
  const view = render(<App />);
  expect(view).toBeTruthy();
});