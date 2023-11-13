import renderer from 'react-test-renderer';
import SecondTab from './BoardView';

it('renders correctly', () => {
  const tree = renderer.create(<SecondTab />).toJSON();
  expect(tree).toMatchSnapshot();
});