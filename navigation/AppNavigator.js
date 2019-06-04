import React from 'react';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import {
  LoginComponent,
  AuthLoadingScreen,
  GetUserLocation,
  ProfileScreen,
  PairCentersScreen,
  BasicProfileForm,
  MessageScreen
} from '../screens';
import UserProfileViewScreen from '../components/UserProfileViewScreen';
import {HomeScreenNavigator} from '../navigation';


export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  //Auth: AuthStack,
  LoginComponent: LoginComponent,
  MessageScreen: MessageScreen,
  PairCentersScreen: PairCentersScreen,
  ProfileScreen: ProfileScreen,
  BasicProfileForm: BasicProfileForm,
  HomeScreen: HomeScreenNavigator,
  GetUserLocation: GetUserLocation,
  UserProfileViewScreen:UserProfileViewScreen
}, {
  initialRouteName: 'AuthLoading',
});

