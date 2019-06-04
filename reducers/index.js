// import {
//   Actions
// } from '../actions/index';
//
// function userData(state = {}, action) {
//   //debugger
//   switch (action.type) {
//     case Actions.COMPONENT_INITIALIZING:
//       return {};
//     case Actions.LOGIN_SUCCESS:
//       return JSON.parse(JSON.stringify(action.payload));
//     case Actions.INVALID_SESSION:
//       return {}
//     default:
//       return state
//   }
// }
//
// function isAppLoading(state= {},action) {
//   switch (action.type) {
//     case Actions.COMPONENT_INITIALIZING:
//       return true;
//     case Actions.LOGIN_SUCCESS:
//       return false;
//     case Actions.INVALID_SESSION:
//       return false;
//     default:
//       return state
//   }
// }
//
// function isUserLoggedIn(state= {},action) {
//   switch (action.type) {
//     case Actions.COMPONENT_INITIALIZING:
//       return false;
//     case Actions.LOGIN_SUCCESS:
//       return true;
//     case Actions.INVALID_SESSION:
//       return false;
//     default:
//       return state
//   }
// }
//
// export default {
//   userData,
//   isAppLoading,
//   isUserLoggedIn
// }

import {reducer as formReducer} from 'redux-form'

export default {
  form: formReducer
}
