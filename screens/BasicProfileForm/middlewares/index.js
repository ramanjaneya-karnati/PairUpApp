import {raiseAction, Actions} from '../actions'
import {
  API_FETCH_STATUS_SUCCESS,
  API_FETCH_STATUS_FAILURE,
  ApiUrls,
  FORM_NAMES,
  API_FETCH_STATUS_IN_PROGRESS
} from '../../../constants';
import {httpSecureHandler} from '../../../utils';
import {change, getFormValues} from "redux-form";
import {MAIN_APP_FORM_VALUES} from "../../../constants";

export default store => next => action => {
  next(action);
  switch (action.type) {
    case Actions.BASIC_PROFILE_COMPONENT_INIT:
      basicFormData(store, action.payload);
      break
  }
}

async function basicFormData(store, payload) {
  try {
    const formData = getFormValues(FORM_NAMES.MAIN_FORM)(store.getState());
    const {
      firstName,
      lastName,
      gender,
      dob
    } = formData;
    const {navigation} = payload;
    const month = dob.getMonth() + 1;
    const request = {
      firstName,
      lastName,
      gender: !gender ? 'M' : 'F',
      dob: dob.getFullYear() + "-" + month + "-" + dob.getDate()
    };
    store.dispatch(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    const basicForm = await httpSecureHandler(ApiUrls.API.UPDATE_USER_INFO_WHILE_LANDING, request);
    if (basicForm.status && basicForm.status.toLowerCase() === 'success') {
      store.dispatch(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
      navigation.navigate('HomeScreen');
    } else {
      store.dispatch(change(FORM_NAMES.MAIN_FORM, MAIN_APP_FORM_VALUES.ALERT, {
        type: true,
        message: 'ERROR_IN_SAVING!!'
      }));
      setTimeout(function () {
        store.dispatch(change(FORM_NAMES.MAIN_FORM, MAIN_APP_FORM_VALUES.ALERT, {
          type: false,
          message: 'DISMISSED!!'
        }));
      }, 4000);
      store.dispatch(change(FORM_NAMES.MAIN_FORM, `${MAIN_APP_FORM_VALUES.SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE));
    }
  } catch (e) {
    store.dispatch(change(FORM_NAMES.MAIN_FORM, MAIN_APP_FORM_VALUES.ALERT, {
      type: true,
      message: 'ERROR_IN_SAVING!!'
    }));
    setTimeout(function () {
      store.dispatch(change(FORM_NAMES.MAIN_FORM, MAIN_APP_FORM_VALUES.ALERT, {
        type: false,
        message: 'DISMISSED!!'
      }));
    }, 4000);
    console.log("::::Error in submitting basic form data:::::", e);
  }
}
