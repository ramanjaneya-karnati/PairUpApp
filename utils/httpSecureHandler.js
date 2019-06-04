import {getUserTokenFromLocalStorage} from './index'

export default async function httpSecureHandler(url, request) {

  const options = {
    "method": "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'JWT ' + await getUserTokenFromLocalStorage(),
    },
    body: JSON.stringify(request),
  };
  return new Promise(function (resolve, reject) {
    fetch(url, options).then(function (response) {
      return response.json();
    }).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error);
    })
  });
}

export async function httpFileUploadPostHandler(url, data) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' + await getUserTokenFromLocalStorage(),
    },
    body: data
  };
  return new Promise(function (resolve, reject) {
    fetch(url, options).then(function (response) {
      return response.json();
    }).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error);
    })
  });
}
