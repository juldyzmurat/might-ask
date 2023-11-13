import renderer from 'react-test-renderer';
import GoogleLoginComponent from './LoginAPI';

it('renders correctly', () => {
  const tree = renderer.create(<GoogleLoginComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});