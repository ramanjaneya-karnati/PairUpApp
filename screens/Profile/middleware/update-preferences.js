import {change, getFormValues} from 'redux-form';
import {
  USER_PROFILE_LANDING_FORM_KEYS, VIEWS
} from '../constants';
import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  API_FETCH_STATUS_FAILURE,
  ApiUrls,
  FORM_NAMES
} from '../../../constants'
import {httpSecureHandler} from '../../../utils';
import {Actions, raiseAction} from "../actions";
import {processUserData} from "../utils";

export default function userSettings(store) {


  const formData = getFormValues(FORM_NAMES.USER_PROFILE_LANDING_FORM)(store.getState());
  let gender;
  const {
    lookingForMen,
    lookingForWomen,
    isVisible,
    preferredAgeRangeMax,
    preferredAgeRangeMin,
    hideAge
  } = formData.userData;

  if (lookingForMen && lookingForWomen) {
    gender = 'B'
  } else {
    if (lookingForMen) {
      gender = 'M'
    } else {
      gender = 'F'
    }
  }
  const request = {
    preferredGender: gender,
    preferredAgeMin: preferredAgeRangeMin,
    preferredAgeMax: preferredAgeRangeMax,
    isVisible: !isVisible,
    hideAge,
  };
  store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
  httpSecureHandler(ApiUrls.API.USER_SETTING_UPDATE, request).then(async (response) => {
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (response.status && response.status.toLowerCase() === 'success') {
      const data = await processUserData(store.dispatch, response.data);
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}`, data));
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.BK_USER_DATA}`, data));
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
    } else if (response.errorCode === 'INVALID_DATA') {
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.ALERT, {
        type: true,
        message: 'ERROR_IN_SAVING!!'
      }));
      setTimeout(function () {
        store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.ALERT, {
          type: false,
          message: 'DISMISSED!!'
        }));
      }, 4000);
    } else {
      throw new Error();
    }
  }).catch((error) => {
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.ALERT, {
      type: true,
      message: 'OOOPS!! PLEASE_TRY_AGAIN'
    }));
    setTimeout(function () {
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.ALERT, {
        type: false,
        message: 'DISMISSED!!'
      }));
    }, 4000);
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE))
  })

}
