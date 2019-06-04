// @flow
import * as React from "react";
import {View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo";

import Image from "./Image";
import Text from "./Text";
import {Icon} from "react-native-elements";
import {change} from "redux-form";
import {StyleGuide, type StyleProps} from "./theme";
import Colors from '../constants/Colors'
import type {Picture} from "./Model";
import Button from "./Button";
import {FORM_NAMES} from "../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from '../screens/PairCenters/constants';
import {Actions, raiseAction} from "../screens/PairCenters/actions";

type CardProps = StyleProps & {
  title: string,
  subtitle?: string,
  picture?: Picture,
  height?: number,
  onPress: () => mixed,
  children?: React.Node
};

export default class Card extends React.PureComponent<CardProps> {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    height: 300
  };

  render(): React.Node {
    const {picture, height, icon, title, subtitle, onPress, children, style} = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.card, style]}>
          {picture && <Image style={[styles.image, {height}]} {...picture} />}
          {children}
          <View style={styles.content}>
            <LinearGradient colors={topGradient} style={styles.gradient}>
              {
                subtitle && (
                  <Text type="headline" style={styles.subtitle}>{subtitle.toUpperCase()}</Text>
                )
              }
              <Text type="title2" color="white">{title}</Text>
            </LinearGradient>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const topGradient = ["rgba(0,0,0,0.8)", "transparent"];
const bottomGradient = ["transparent", "rgba(0,0,0,0.8)"];
const subtitle = "rgba(255, 255, 255, 0.7)";
const styles = StyleSheet.create({
  card: {
    ...StyleGuide.styles.borderRadius,
    marginTop: StyleGuide.spacing.small,
    marginHorizontal: StyleGuide.spacing.small,
    backgroundColor: StyleGuide.palette.darkGray,
    flex: 1
  },
  image: {
    ...StyleGuide.styles.borderRadius
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between"
  },
  gradient: {
    padding: StyleGuide.spacing.small,
    ...StyleGuide.styles.borderRadius
  },
  subtitle: {
    color: subtitle,
    fontSize: 15
  },
  container: {
    alignSelf: "flex-end",
    position: 'absolute',
    bottom: 0,
    padding: StyleGuide.spacing.tiny
  },
  checkInIcon: {
    alignSelf: "center",
    color: Colors.primary,
    marginBottom: StyleGuide.spacing.large,

  }

});
