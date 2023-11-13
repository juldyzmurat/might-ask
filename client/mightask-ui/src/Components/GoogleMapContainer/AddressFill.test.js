import renderer from 'react-test-renderer';
import AddressAutofill from './AddressFill';

it('renders correctly', () => {
  const tree = renderer.create(<AddressAutofill />).toJSON();
  expect(tree).toMatchSnapshot();
});