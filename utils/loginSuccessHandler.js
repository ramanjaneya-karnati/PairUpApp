import {setUserTokenFromLocalStorage} from '../utils';

export default function loginSuccessHandler(token) {
  try {
    if (token) {
      setUserTokenFromLocalStorage(token);
    }
  } catch (e) {
    console.log("Error on setting login access token");
  }
}
