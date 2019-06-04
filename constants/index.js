import StyleGuide from './StyleGuide';
import Colors from './Colors';
import IntlTextEnglish from './IntlTextEnglish';
import ApiUrls from './ApiUrls';
import ImageUrls from './imageUrls';

const FORM_NAMES = {
  LOGIN_FORM: 'loginForm',
  MAIN_FORM: 'mainForm',
  USER_PROFILE_IMAGES: 'userProfileImages',
  USER_PROFILE_FORM: 'userProfileForm',
  USER_PROFILE_LANDING_FORM: 'userProfileLandingForm',
  PAIR_CENTERS_FORM: 'pairCentersForm',
  USER_LOCALE_INTERSTS: 'userLocaleInterests',
  GET_USERS_BY_LOCALE: 'getUsersByLocale',
  BASIC_PROFILE_FORM: 'basicProfileForm',
  MESSAGES_MAIN_FORM: 'messagesMainForm',
  USER_CARDS_FORM:'userCardsForm'
};

export const MAIN_APP_FORM_VALUES = {
  ALERT: 'alert',
  IS_USER_LOGGED_IN: 'isUserLoggedIn',
  IS_APP_LOADING: 'isAppLoading',
  USER_DATA: 'userData',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  GENDER: 'gender',
  DOB: 'dob',
  SUBMIT_STATUS: 'submitStatus'

};

const EXTERNAL_APP_LINKS = {
  HELP: 'http://www.housestarks.com'
};

export const API_FETCH_STATUS_SUCCESS = 'success';
export const API_FETCH_STATUS_FAILURE = 'failure';
export const API_FETCH_STATUS_IN_PROGRESS = 'in-progress';
export const SUCCESS = 'success';
export const ALERT_SUCCESS = 'success';
export const ALERT_ERROR = 'error';
export const ALERT_INFO = 'info';

export {
  StyleGuide,
  Colors,
  IntlTextEnglish,
  ApiUrls,
  FORM_NAMES,
  ImageUrls,
  EXTERNAL_APP_LINKS
}
