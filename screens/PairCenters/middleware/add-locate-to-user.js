import {change, getFormValues} from "redux-form";
import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  API_FETCH_STATUS_FAILURE,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  FORM_NAMES
} from "../../../constants";
import {PAIR_CENTERS_FORM_KEYS} from "../constants";
import httpSecureHandler from "../../../utils/httpSecureHandler";
import ApiUrls from "../../../constants/ApiUrls";


export default function addLocaleToUserInterests(store) {
  const formData = getFormValues(FORM_NAMES.PAIR_CENTERS_FORM)(store.getState());
  const {
    selectedPairCenterId
  } = formData;
  const request = {
    localeId: selectedPairCenterId.id,
    status: !selectedPairCenterId.isUserInterested
  };
  store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
  httpSecureHandler(ApiUrls.API.ADD_LOCALE_TO_USER_INTERESTS, request).then((response) => {
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (response.status && response.status.toLowerCase() === 'success') {
      selectedPairCenterId.isUserInterested = !selectedPairCenterId.isUserInterested;
      store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.IS_SELECTED_PAIR_CENTER}`, {...selectedPairCenterId}));

    } else {
      throw new Error();
    }
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_SUCCESS));
  }).catch((error) => {
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_FAILURE))
  })

}
