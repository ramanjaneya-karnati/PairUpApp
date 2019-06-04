import {change, initialize} from 'redux-form';
import createStore from '../store'
import {
  FORM_NAMES
} from '../constants'

const store = createStore();

store.dispatch(initialize(FORM_NAMES.LOGIN_FORM, {}));
store.dispatch(initialize(FORM_NAMES.MAIN_FORM, {}));
store.dispatch(initialize(FORM_NAMES.USER_PROFILE_IMAGES, {}));
store.dispatch(initialize(FORM_NAMES.USER_PROFILE_FORM, {}));

export {
  store
}
