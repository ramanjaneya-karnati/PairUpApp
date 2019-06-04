import {change} from "redux-form";
import {
  API_FETCH_STATUS_FAILURE,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  FORM_NAMES
} from "../../../constants";
import {PAIR_CENTERS_FORM_KEYS} from "../constants";
import httpSecureHandler from "../../../utils/httpSecureHandler";
import ApiUrls from "../../../constants/ApiUrls";

export default function addLocaleToUserInterests(store, payload) {
  const {
    user,
    type,
    from
  } = payload;
  const request = {
    reportUserId: user.id,
    type,
    from
  };
  store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_IN_PROGRESS));
  httpSecureHandler(ApiUrls.API.REPORT_USER, request).then((response) => {
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_SUCCESS));
    if (response.status && response.status.toLowerCase() === 'success') {
      store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.USER_REPORT}`, true));
    } else {
      throw new Error();
    }
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_SUCCESS));
  }).catch((error) => {
    store.dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.FETCH_STATUS}`, API_FETCH_STATUS_FAILURE))
  })

}
