/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import Notifications from '../notifications';

// create mock store
const mockStore = configureMockStore();

test('# Notifications', () => {
  const store = mockStore();

  const wrapper = shallow(<Notifications store={store} />);
  expect(wrapper).toMatchSnapshot();
});
