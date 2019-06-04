import {Actions, raiseAction} from '../actions';
import {change, getFormValues} from 'redux-form';
import {
  USER_CARDS_FORM_KEYS, VIEWS
} from '../constants';
import {getUserTokenFromLocalStorage, httpSecureHandler} from "../../../utils";
import {
  API_FETCH_STATUS_FAILURE,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  ApiUrls, FORM_NAMES
} from '../../../constants';

export default store => next => action => {
  next(action);
  switch (action.type) {
    case Actions.USER_CARDS_COMPONENT_INIT:
      initialView(store.dispatch);
      break;
  /*  case Actions.SELECTED_USER_PROFILE:
      selctedUserProfileView(store.dispatch)
      break;*/
  }
}

function initialView(dispatch) {
  dispatch(change(FORM_NAMES.USER_CARDS_FORM, `${USER_CARDS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.USER_CARDS_VIEW));
}

/*async function getPairCentersData(dispatcher) {
  try {
    dispatcher(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    const pairCenters = await httpSecureHandler(ApiUrls.API.FETCH_PAIR_CENTERS, {});
    dispatcher(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (pairCenters.status && pairCenters.status.toLowerCase() === 'success') {
      dispatcher(raiseAction(Actions.PAIR_CENTERS_DATA_SUCCESS));
      await imageProcessing(dispatcher, pairCenters.data);
      dispatcher(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.PAIR_CENTERS_DATA}`, pairCenters.data));

    } else {
      dispatcher(raiseAction(Actions.PAIR_CENTERS_DATA_FAILURE));
    }
    dispatcher(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
  } catch (e) {
    dispatcher(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.API_FAILURE}`, true));
    dispatcher(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE));
  }
}

async function imageProcessing(dispatcher, data) {
  const token = await getUserTokenFromLocalStorage();
  data && data.forEach(function (locale) {
    if (locale.imageLocation) {
      locale.url = `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${locale.imageLocation}`;
      locale.thumbUrl = `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${locale.imageThumbnailLocation}`;
    } else {
      locale.url = "https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/6/0/3/823067-1-eng-GB/Good-Pub-Guide-2016-average-UK-beer-prices_wrbm_large.jpg"
    }
    // if (locale.images) {
    //   for (let i = 0; i < locale.images.length; i++) {
    //     locale.images[i] = {
    //       id: locale.images[i].id,
    //       url: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${locale.images[i].imageLocation}`,
    //       thumbUrl: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${locale.images[i].imageThumbnailLocation}`,
    //       thumbPath: locale.images[i].imageThumbnailLocation,
    //       imagePath: locale.images[i].imageLocation
    //     }
    //   }
    // }
    // else {
    //   locale.url = "https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/6/0/3/823067-1-eng-GB/Good-Pub-Guide-2016-average-UK-beer-prices_wrbm_large.jpg"
    // }
  });
}*/
