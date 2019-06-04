import {raiseAction, Actions} from '../actions'
import {ApiUrls, FORM_NAMES, MAIN_APP_FORM_VALUES} from '../constants';
import {httpSecureHandler} from '../utils';
import {change} from 'redux-form'

export default store => next => action => {
  next(action);
  switch (action.type) {
    case Actions.COMPONENT_INITIALIZING:
      store.dispatch(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.IS_USER_LOGGED_IN}`, false));
      store.dispatch(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.IS_APP_LOADING}`, true));
      isSessionExists(store.dispatch, action.payload);
      break;
  }
}

async function isSessionExists(dispatcher, payload) {
  const {
    navigation
  } = payload;
  try {
    const userProfile = await httpSecureHandler(ApiUrls.API.GET_USER_PROFILE, {});
    if (userProfile.status === 'SUCCESS') {
      dispatcher(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.USER_DATA}`, userProfile.data));
      dispatcher(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.IS_USER_LOGGED_IN}`, true));
      if (userProfile.data.isProfileComplete === false) {
        navigation.navigate('BasicProfileForm');
      } else {
        navigation.navigate('HomeScreen');

      }
    } else {
      dispatcher(raiseAction(Actions.INVALID_SESSION));
      dispatcher(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.IS_USER_LOGGED_IN}`, false));
      navigation.navigate('LoginComponent');
    }
    dispatcher(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.IS_APP_LOADING}`, false));
  } catch (e) {
    dispatcher(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.IS_APP_LOADING}`, false));
    console.error(":::::Error in checking the user session:::::", e);
    navigation.navigate('LoginComponent');
  }
}
