import {Actions, raiseAction} from '../actions'
import {change, getFormValues} from 'redux-form'
import {
  USER_PROFILE_LANDING_FORM_KEYS,
  VIEWS
} from '../constants'
import {httpFileUploadPostHandler, httpSecureHandler} from "../../../utils";
import {
  API_FETCH_STATUS_FAILURE,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  ApiUrls,
  FORM_NAMES
} from '../../../constants'
import {processUserData} from '../utils';
import updateSettings from './update-settings';
import updatePreferences from './update-preferences';

export default store => next => action => {
  next(action);
  switch (action.type) {
    case Actions.USER_PROFILE_LANDING_COMPONENT_INIT:
      initialize(store.dispatch);
      getUserData(store.dispatch);
      break;
    case Actions.USER_PROFILE_UPDATE_SUBMIT:
      updateSettings(store);
      break;
    case Actions.USER_PREFERENCES_SUBMIT:
      updatePreferences(store);
      break;
    case Actions.USER_PROFILE_IMAGE_UPLOAD:
      uploadImage(store, action.payload);
      break;
    case Actions.USER_PROFILE_IMAGE_DELETE:
      deleteImage(store.dispatch, action.payload);
      break;
  }
}

function initialize(dispatch) {
  dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
}

async function getUserData(dispatcher) {
  try {
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.VIEW_PROFILE_SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    const userProfile = await httpSecureHandler(ApiUrls.API.GET_USER_PROFILE, {});
    if (userProfile.status === 'SUCCESS') {
      dispatcher(raiseAction(Actions.USER_PROFILE_LANDING_SUCCESS));
      const data = await processUserData(dispatcher, userProfile.data);
      dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}`, data));
      dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.BK_USER_DATA}`, data));
      dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.ALERT, {
        type: false,
        message: 'SUCCESS'
      }));
      dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_PROFILE_ALERT, {
        type: false,
        message: 'SUCCESS'
      }));
      dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_IMAGES_ALERT, {
        type: false,
        message: 'SUCCESS'
      }));
    } else {
      dispatcher(raiseAction(Actions.USER_PROFILE_LANDING_FAILURE));
    }
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.VIEW_PROFILE_SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
  } catch (e) {
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.API_FAILURE}`, true));
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.VIEW_PROFILE_SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE));
  }
}

async function deleteImage(dispatcher, payload) {
  try {
    const {
      thumbPath,
      imagePath,
      id
    } = payload;
    const request = {
      thumbPath,
      imagePath,
      id
    };
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    const userProfile = await httpSecureHandler(ApiUrls.API.DELETE_USER_IMAGE, request);
    if (userProfile.status === 'SUCCESS') {
      await processUserData(dispatcher, userProfile.data);
      dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}`, userProfile.data));
    }
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
  } catch (e) {
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_IMAGES_ALERT, {
      type: true,
      message: 'OOPS!! PLEASE_TRY_AGAIN'
    }));
    setTimeout(function () {
      dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_IMAGES_ALERT, {
        type: false,
        message: 'DISMISSED!!'
      }));
    }, 4000);
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.API_FAILURE}`, true));
    dispatcher(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE));
  }
}

async function uploadImage(store, payload) {
  try {
    const {
      uri,
      index
    } = payload;
    const storeData = getFormValues(FORM_NAMES.USER_PROFILE_LANDING_FORM)(store.getState());
    const {
      userData: {
        images
      }
    } = storeData;
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    const formData = new FormData();
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    if (images[index].id) {
      formData.append('id', images[index].id);
    }
    if (images[index].imagePath) {
      formData.append('deleteUrl', images[index].imagePath);
    }
    if (images[index].thumbPath) {
      formData.append('deleteThumbUrl', images[index].thumbPath);
    }
    if (index === 0) {
      formData.append('isDefault', true);
    } else {
      formData.append('isDefault', false);
    }
    const userProfile = await httpFileUploadPostHandler(ApiUrls.API.UPLOAD_IMAGE, formData);
    if (userProfile.status === 'SUCCESS') {
      await processUserData(store.dispatch, userProfile.data);
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}`, userProfile.data));
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_IMAGES_ALERT, {
        type: true,
        message: 'OOPS!! PLEASE_TRY_AGAIN'
      }));
      setTimeout(function () {
        store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_IMAGES_ALERT, {
          type: false,
          message: 'DISMISSED!!'
        }));
      }, 4000);
    }
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
  } catch (e) {
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_IMAGES_ALERT, {
      type: true,
      message: 'OOPS!! PLEASE_TRY_AGAIN'
    }));
    setTimeout(function () {
      store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, USER_PROFILE_LANDING_FORM_KEYS.UPDATE_IMAGES_ALERT, {
        type: false,
        message: 'DISMISSED!!'
      }));
    }, 4000);
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.API_FAILURE}`, true));
    store.dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE));
  }
}

