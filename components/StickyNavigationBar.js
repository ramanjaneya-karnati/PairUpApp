// @flow
import * as React from "react";

import {View, Animated, StyleSheet, TouchableOpacity, Image} from "react-native";
import {LinearGradient} from "expo";

import type {____ViewStyleProp_Internal as Style} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import Text from "./Text";
import SafeAreaView from "./SafeAreaView";
import {withTheme, StyleGuide} from "./theme";
import {Icon} from "react-native-elements";
import {withNavigation} from 'react-navigation';
import {change} from "redux-form";
import {FORM_NAMES} from "../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from "../screens/PairCenters/constants";
import {Actions, raiseAction} from "../screens/PairCenters/actions";

class NavigationBar extends React.Component {

  static defaultProps = {
    type: "transparent",
    title: "",
    withGradient: false,
    expanded: false,
    height: 100
  };

  constructor(props) {
    super(props);
  }

  profilePage = () => {
    const {dispatch} = this.props;
    dispatch(raiseAction(Actions.LIKED_USERS_LIST));
  };
  pageRefresh = () => {
    const {dispatch} = this.props;
    dispatch(raiseAction(Actions.PAIR_CENTERS_COMPONENT_INIT));
  };

  render() {
    const {type, theme, largeTitle, dispatch, navigation} = this.props;
    const containerStyle = {backgroundColor: type === "opaque" ? theme.palette.primary : "transparent"};
    const navBar = (
      <SafeAreaView style={containerStyle} top>
        <View style={styles.content}>
          <View style={styles.profile}>
            <TouchableOpacity onPress={this.profilePage} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
              <Icon name="heart" type="font-awesome" size={26} color={StyleGuide.palette.gray}/>
            </TouchableOpacity>
          </View>
          <View>
            <Image style={{width: 55, height: 50}} source={require('../assets/images/Logo.png')}/>
          </View>
          <View style={styles.notification}>
            <TouchableOpacity onPress={this.pageRefresh} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
              <Icon name="ios-refresh" type="ionicon" size={30} color={StyleGuide.palette.gray}/>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
    return navBar;
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: StyleGuide.spacing.small,
    ...StyleGuide.styles.barHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  notification: {
    paddingRight: StyleGuide.spacing.base
  },
  profile: {
    paddingLeft: StyleGuide.spacing.base
  }
});

const AnimatedText = Animated.createAnimatedComponent(Text);
export default withTheme(NavigationBar);
