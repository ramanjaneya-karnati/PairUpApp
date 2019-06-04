// @flow
import * as React from "react";
import {Image as NativeImage, StyleSheet, TouchableHighlight, View, TouchableOpacity} from "react-native";
import {Svg} from "expo";

import CacheManager from "./CacheManager";
import type {StyleProps} from "./theme";

const {Defs, Image, ClipPath, Path} = Svg;

type AvatarProps = StyleProps & {
  size: number,
  uri: string,
  stacked: boolean,
  onPress: () => void

};

type AvatarState = {
  uri: ?string
};

export default class Avatar extends React.Component<AvatarProps, AvatarState> {

  static defaultProps = {
    size: 50,
    stacked: true
  };

/*  state = {
    uri: undefined
  };

  async componentDidMount(): Promise<void> {
    const {uri} = this.props;
    debugger
    const newURI = uri;
    if (newURI) {
      this.setState({ uri: newURI });
    }
  }*/
  render() {
    const {stacked, size, style, onPress, uri} = this.props;
    //const {uri} = this.state;
    const width = size;
    const height = size;
    const borderRadius= width / 2
    if (stacked) {
      const computedStyle = {
        height,
        width,
        borderRadius: width / 2
      };
      return (
        <TouchableOpacity onPress={onPress}>
        <NativeImage style={[styles.avatar, style, computedStyle]} source={{ uri }} />
        </TouchableOpacity>

      );
    }
    return (
      <View style={[styles.avatar, style]} {...{ width, height}}>
            <Image
              source={{ uri }}
              {...{width: size, height: size}}
            />
          )
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center"
  }
});
