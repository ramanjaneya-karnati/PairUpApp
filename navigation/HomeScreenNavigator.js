import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Colors} from '../constants';
import {UserCardsScreen, PairCentersScreen, MessageScreen, ProfileScreen} from '../screens'

const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: PairCentersScreen,
      path: 'Pairs',
    },
    People: {
      screen: UserCardsScreen,
      path: 'Swipe',
    },
    Chat: {
      screen: MessageScreen,
      path: 'Messages',
    },
    Settings: {
      screen: ProfileScreen,
      path: 'Profile',
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
      showLabel: true,
      style:{
        paddingTop:5,
        borderTopColor:"#CCC"
      }
    },
  }
);


export default class HomeScreenNavigator extends React.Component {
  static router = MainTabs.router;

  render() {
    return <MainTabs navigation={this.props.navigation}/>;
  }
}
