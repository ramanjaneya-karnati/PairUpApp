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
import {PAIR_CENTERS_FORM_KEYS} from "../constants";
import {getUserTokenFromLocalStorage} from "../../../utils";

export default async function getUsersByLocale(store) {
  try {
    const formData = getFormValues(FORM_NAMES.PAIR_CENTERS_FORM)(store.getState());
    const mainFormData = getFormValues(FORM_NAMES.MAIN_FORM)(store.getState());
    const {
      userData
    } = mainFormData;
    const {
      selectedPairCenterId
    } = formData;

    const request = {
      localeId: selectedPairCenterId.id
    };

    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
    const fetchUserByLocale = await httpSecureHandler(ApiUrls.API.FETCH_USERS_BY_LOCALE_INTEREST, request);
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SUBMIT_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (fetchUserByLocale.status && fetchUserByLocale.status.toLowerCase() === 'success') {
      let rawData = fetchUserByLocale.data;
      rawData.filter((users, index)=>{
        if (rawData[index].userId === userData.id) {
          return rawData.splice(index, 1);
        }
      });
      await processImages(rawData, store)

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
  const images = data;
  for (let i = 0; i < data.length; i++) {
    if (images[i].imageLocation === null && images[i].imageThumbnailLocation === null) {
      images[i] = {
        id: images[i].id,
        url: 'https://ellerfield.com.au/wp-content/uploads/2016/02/avatar_placeholder_small.png',
        userId: images[i].userId
      }
    } else {
      images[i] = {
        id: images[i].id,
        url: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${images[i].imageLocation}`,
        thumbUrl: `${ApiUrls.API.FETCH_USER_IMAGE_URL}?token=${token}&imagePath=${images[i].imageThumbnailLocation}`,
        thumbPath: images[i].imageThumbnailLocation,
        imagePath: images[i].imageLocation,
        userId: images[i].userId
      }
    }

  }
  store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.INTERESTED_USERS}`, images));

}
