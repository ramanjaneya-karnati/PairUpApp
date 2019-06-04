const BASE_URL = '<BACKEND API URL>';


export const API = {
  GET_USER_PROFILE: BASE_URL + '/users/getUserProfile',
  USER_AUTHENTICATE: BASE_URL + '/authenticate',
  USER_PROFILE_UPDATE: BASE_URL + '/users/updateAboutUserInfo',
  USER_SETTING_UPDATE: BASE_URL + '/users/updateUserPreferences',
  UPLOAD_IMAGE: BASE_URL + '/users/uploadImage',
  FETCH_USER_IMAGE_URL: BASE_URL + '/fetchUserImage',
  DELETE_USER_IMAGE: BASE_URL + '/users/deleteImage',
  FETCH_PAIR_CENTERS: BASE_URL + '/locales/fetchLocales',
  ADD_LOCALE_TO_USER_INTERESTS: BASE_URL + '/locales/addLocaleToUserInterests',
  FETCH_USERS_BY_LOCALE_INTEREST: BASE_URL + '/locales/fetchUsersByLocaleInterest',
  GET_USER_DETAILS: BASE_URL + '/users/getUserDetailsById',
  UPDATE_USER_INFO_WHILE_LANDING: BASE_URL + '/users/updateUserInfoWhileLanding',
  REPORT_USER: BASE_URL + '/users/reportUser',
  LIKED_USERS_LIST: '',
  SINGLE_USER_LIKED_PROFILE_VIEW:''
};

export default {
  API
}
