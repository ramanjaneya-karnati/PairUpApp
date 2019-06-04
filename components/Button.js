// @flow

import * as React from "react";
import {StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, Platform} from "react-native";
import {Colors} from "../constants";
import {StyleGuide} from "../components";


type ButtonProps = {
  onPress: () => mixed,
  primary?: boolean,
  secondary?: boolean,
  label?: string,
  disabled?: boolean
}

export default class Button extends React.PureComponent<ButtonProps> {

  render(): React.Node {

    const {onPress, primary, secondary, label, style, disabled} = this.props;

    const opacity = disabled ? 0.5 : 1;
    let color: string;
    let backgroundColor: string;
    let borderColor: string;
    let borderWidth: number;
    if (primary) {
      backgroundColor = Colors.primary;
    } else if (secondary) {
      backgroundColor = Colors.secondary;
    } else {
      backgroundColor = "transparent";
    }
    if (primary) {
      color = Colors.buttonColor;
    } else if (secondary) {
      color = Colors.buttonColor;
    } else {
      color = StyleGuide.palette.darkGray;
      borderColor = Colors.darkGray,
      borderWidth = 1

    }

    const shadow = primary ? StyleGuide.styles.shadow : {};
    let Btn: React.ComponentType<*>;
    if (disabled) {
      Btn = View;
    } else if (Platform.OS === "ios") {
      Btn = TouchableOpacity;
    } else {
      Btn = TouchableNativeFeedback;
    }
    return (
      <Btn {...{onPress}}>
        <View style={[styles.button, {...shadow, backgroundColor, opacity, borderColor, borderWidth}, style]}>
          <Text style={[styles.ButtonText, {color}]}>{label}</Text>
        </View>
      </Btn>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    justifyContent: "center",
    padding: 8,
    paddingBottom: 10,
    flexDirection: "row",
    marginBottom: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 20,
    fontFamily: "Gotham-Rounded-SemiBold"
  },
});
