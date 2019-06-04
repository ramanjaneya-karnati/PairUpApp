import {change, getFormValues} from "redux-form";
import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  API_FETCH_STATUS_FAILURE,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  FORM_NAMES
} from "../../../constants";
import httpSecureHandler from "../../../utils/httpSecureHandler";
import ApiUrls from "../../../constants/ApiUrls";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from "../constants";
import {getUserTokenFromLocalStorage} from "../../../utils";
import ApiData from './api/data';

export default async function likedUsersList(store) {
  try {
    const mainFormData = getFormValues(FORM_NAMES.MAIN_FORM)(store.getState());
    const {
      userData
    } = mainFormData;

    const request = {
      userId: userData.id
    };

    const likedUsersList = {
      status: 'success'
    };

    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    //const likedUsersList = await httpSecureHandler(ApiUrls.API.LIKED_USERS_LIST, request);
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (likedUsersList.status && likedUsersList.status.toLowerCase() === 'success') {
      //const resData = await processImages(ApiData, store);
      store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.USERS_LIKED_LIST}`, ApiData));
      store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.USERS_LIKED_SCREEN));

    } else {
      throw new Error();
    }
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));

  } catch (e) {
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_FAILURE));

  }
}

async function processImages(data, store) {
  const token = await getUserTokenFromLocalStorage();
  const images = data.images;
  for (let i = 0; i < images.length; i++) {
    if (!images[i]) {
      images[i] = {
        url: 'http://www.uaos.unios.hr/web2019/wp-content/uploads/2018/10/placeholder.jpg',
        thumbUrl: 'http://www.uaos.unios.hr/web2019/wp-content/uploads/2018/10/placeholder.jpg'
      }
    } else {
      images[i] = {
        id: images[i].id,
        url: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${images[i].imageLocation}`,
        thumbUrl: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${images[i].imageThumbnailLocation}`,
        thumbPath: images[i].imageThumbnailLocation,
        imagePath: images[i].imageLocation,
      }
    }
  }
  return data;
  //store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SELECTED_USER_ID_DATA}`, data));

}
