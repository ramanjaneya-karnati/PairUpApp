import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'
import {createLogger} from 'redux-logger';
import mainAppMiddleWares from '../middlewares';
import userProfileLandingMiddleware from '../screens/Profile/middleware';
import loginMiddleWares from '../screens/Login/middlewares';
import pairCentersMiddleware from '../screens/PairCenters/middleware';
import basicFormDataMiddleware from '../screens/BasicProfileForm/middlewares';
import messageViewMiddleware from '../screens/Messages/middlewares';
import userCardsMiddleware from '../screens/UserCards/middleware';

import reducers from '../reducers';

const middleWares = [
  mainAppMiddleWares,
  loginMiddleWares,
  userProfileLandingMiddleware,
  pairCentersMiddleware,
  basicFormDataMiddleware,
  messageViewMiddleware,
  userCardsMiddleware
];

if (__DEV__ === true) {
  middleWares.push(createLogger());
}

export default function configureStore(initialState) {
  return compose(applyMiddleware(...middleWares))(createStore)(combineReducers({...reducers}), initialState);
}
