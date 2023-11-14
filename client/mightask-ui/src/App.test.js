import renderer from 'react-test-renderer';
import render from '@testing-library/react';
import App from './App';

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('has a routes element', () => {
  const view = render(<App />);
  expect(view).toBeTruthy();
});