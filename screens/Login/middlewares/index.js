import {raiseAction, Actions} from '../actions'
import {ApiUrls, FORM_NAMES, MAIN_APP_FORM_VALUES} from '../../../constants';
import {loginSuccessHandler, httpSecureHandler, setUserTokenFromLocalStorage} from '../../../utils';
import {change, getFormValues} from "redux-form";

export default store => next => action => {
  next(action);
  switch (action.type) {
    case Actions.LOGIN_COMPONENT_INIT:
      return true;
    case Actions.SUBMIT_LOGIN:
      loginData(store.dispatch, action.payload)
      break
  }
}

async function loginData(dispatcher, payload) {
  try {
    const {
      data,
      navigate
    } = payload;
    const userProfile = await httpSecureHandler(ApiUrls.API.USER_AUTHENTICATE, data);
    if (userProfile.status === 'SUCCESS') {
      dispatcher(raiseAction(Actions.SUBMIT_LOGIN_SUCCESS, userProfile.data));
      dispatcher(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.USER_DATA}`, userProfile.userDetails));
      setUserTokenFromLocalStorage(userProfile.data);
      if (userProfile.userDetails.isProfileComplete === false) {
        navigate('BasicProfileForm');
      } else {
        navigate('HomeScreen');
      }
    } else {
      dispatcher(raiseAction(Actions.SUBMIT_LOGIN_FAILURE));
      navigate('LoginComponent');
    }
  }
  catch (e) {
    console.log("::::Error in Submitting Login Data:::::", e);
  }
}
