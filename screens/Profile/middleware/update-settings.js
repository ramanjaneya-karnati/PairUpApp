import {change, getFormValues} from "redux-form";
import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  API_FETCH_STATUS_FAILURE,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  FORM_NAMES
} from "../../../constants";
import {USER_PROFILE_LANDING_FORM_KEYS, VIEWS} from "../constants";
import httpSecureHandler from "../../../utils/httpSecureHandler";
import ApiUrls from "../../../constants/ApiUrls";
import {Actions, raiseAction} from "../actions";
import {processUserData} from "../utils";

export default function updateUserProfile(store) {
  const formData = getFormValues(FORM_NAMES.USER_PROFILE_LANDING_FORM)(store.getState());
  const {
    about,
    company,
    gender,
    activities
  } = formData.userData;
  const request = {
    about,
    company,
    gender: !gender ? 'M' : 'F',
    interests: activities
  };
  store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
  httpSecureHandler(ApiUrls.API.USER_PROFILE_UPDATE, request).then(async (response) => {
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (response.status && response.status.toLowerCase() === 'success') {
      const data = await processUserData(store.dispatch, response.data);
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}`, data));
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.BK_USER_DATA}`, data));
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
    } else {
      throw new Error();
    }
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
  }).catch((error) => {
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_PROFILE_ALERT, {
      type: true,
      message: 'OOOPS!! PLEASE_TRY_AGAIN'
    }));
    setTimeout(function () {
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_PROFILE_ALERT, {
        type: false,
        message: 'ALERT_DISMISSED'
      }));
    }, 4000);
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE))
  })

}
