import loginSuccessHandler from './loginSuccessHandler';
import httpSecureHandler, {httpFileUploadPostHandler} from './httpSecureHandler';
import {AsyncStorage} from "react-native";


const getUserTokenFromLocalStorage = async () => {
  try {
    const value = await AsyncStorage.getItem("userToken");
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log("Error fetching user token", error);
  }
};


const setUserTokenFromLocalStorage = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.log("Error in Saving Token")
  }
};


function nameFormatter(string) {
  return string.replace(/ .*/, '');

}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }
  });
}

export {
  loginSuccessHandler,
  httpSecureHandler,
  getUserTokenFromLocalStorage,
  setUserTokenFromLocalStorage,
  getBase64,
  httpFileUploadPostHandler,
  nameFormatter,
}
