// @flow
import * as React from "react";

import {View, Animated, StyleSheet, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo";

import type {____ViewStyleProp_Internal as Style} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import Text from "./Text";
import SafeAreaView from "./SafeAreaView";
import {withTheme, StyleGuide} from "./theme";
import {Icon} from "react-native-elements";
import type {ThemeProps} from "./theme";
import type {NavigationProps} from "../components/Navigation";
import type {Action} from "./Model";
import {change} from "redux-form";
import {FORM_NAMES} from "../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from "../screens/PairCenters/constants";

type NavigationBarType = "opaque" | "transparent";

type NavigationBarProps = ThemeProps & NavigationProps<*> & {
  title: string,
  subtitle?: string,
  type: NavigationBarType,
  titleStyle?: Style,
  back?: string,
  rightAction?: Action,
  withGradient: boolean,
  expanded: boolean,
  largeTitle: boolean
};

class NavigationBar extends React.Component<NavigationBarProps> {

  static defaultProps = {
    type: "transparent",
    title: "",
    withGradient: false,
    expanded: false
  };

  goBack() {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.PAIR_CENTERS_SCREEN));
  }

  render(): React.Node {
    const {
      type, title, subtitle, theme, back, titleStyle, rightAction, withGradient, expanded, largeTitle,
      icon
    } = this.props;
    const block = {flex: largeTitle ? 2 : 1};
    const containerStyle = {
      backgroundColor: type === "opaque" ? theme.palette.primary : "transparent"
    };
    const navBar = (
      <SafeAreaView style={containerStyle} top>
        <View style={styles.content}>
          {back &&
          <View style={[styles.leftBlock]}>
            <TouchableOpacity onPress={this.goBack.bind(this)} activeOpacity={0.4}>
              <Icon  {...icon}/>
            </TouchableOpacity>
          </View>
          }
          {
            (title !== "" && !expanded) && (
              <View style={block}>
                <AnimatedText
                  type="headline"
                  color="white"
                  align="center"
                  style={titleStyle}
                  numberOfLines={1}
                >
                  {title}
                </AnimatedText>
              </View>
            )
          }
        </View>
        {
          expanded && (
            <View style={[{backgroundColor: theme.palette.primary}, styles.header]}>
              <Text type="title1" color="white">{title}</Text>
            </View>
          )
        }
      </SafeAreaView>
    );
    return navBar;
  }
}

const styles = StyleSheet.create({
  content: {
    ...StyleGuide.styles.barHeight,
    flexDirection: "row",
    alignItems: "center"
  },
  leftBlock: {
    flex: 1,
    flexDirection: "row",
    paddingLeft:StyleGuide.spacing.base,
    justifyContent: "flex-start"
  },
  rightBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  header: {
    padding: StyleGuide.spacing.small
  },
  rightAction: {
    marginRight: StyleGuide.spacing.small
  },

});

const AnimatedText = Animated.createAnimatedComponent(Text);
export default withTheme(NavigationBar);
