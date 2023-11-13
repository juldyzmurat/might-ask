import renderer from 'react-test-renderer';
import FirstTab from './ListView';

it('renders correctly', () => {
  const tree = renderer.create(<FirstTab />).toJSON();
  expect(tree).toMatchSnapshot();
});