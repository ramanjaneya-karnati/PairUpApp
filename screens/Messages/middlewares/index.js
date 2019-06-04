import {Actions} from '../actions';
import {change} from 'redux-form';
import {
  MESSAGES_FORM_KEYS, VIEWS
} from '../constants';
import {
  FORM_NAMES
} from '../../../constants';

export default store => next => action => {
  next(action);
  switch (action.type) {
    case Actions.MESSAGES_COMPONENT_INIT:
      initialView(store.dispatch);
      break;
  }
}

function initialView(dispatch) {
  dispatch(change(FORM_NAMES.MESSAGES_MAIN_FORM, `${MESSAGES_FORM_KEYS.CURRENT_VIEW}`, VIEWS.MESSAGES_VIEW));
}

