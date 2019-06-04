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


export default async function getUserDetails(store) {
  try {
    const formData = getFormValues(FORM_NAMES.PAIR_CENTERS_FORM)(store.getState());
    const {
      selectedUserId
    } = formData;

    const request = {
      userId: selectedUserId
    };
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    const getUserDetails = await httpSecureHandler(ApiUrls.API.GET_USER_DETAILS, request);
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (getUserDetails.status && getUserDetails.status.toLowerCase() === 'success') {
      const resData = await processImages(getUserDetails.data, store);
      store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SELECTED_USER_ID_DATA}`, resData));
      store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.USER_PROFILE_VIEW));

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
