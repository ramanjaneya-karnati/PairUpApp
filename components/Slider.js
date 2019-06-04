import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Button, Text } from 'react-native';
import {Icon} from "react-native-elements";
import Colors from "../constants/Colors";
import type StyleGuide from "./theme/StyleGuide";

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 170
const BAR_SPACE = 10;
const IMAGE_HEIGHT=350;

const images = [
  'http://www.starscruisingnightclub.com.au/uploads/lge/1285003010.jpg',
  'https://blog.soondy.com/wp-content/uploads/2017/04/night-out-party-image.jpg',
  'https://farm8.staticflickr.com/7338/12183726876_e8fa7da976_b.jpg',
]

export default class Slider extends React.Component {
  numItems = images.length;
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0);
  curIndex = 0;


  render() {
    const { images } = this.props;
    let imageArray = [];
    let barArray = [];
    images.forEach((image, i) => {
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image.url}}
          style={{ width: deviceWidth, height:IMAGE_HEIGHT }}
        />
      );
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });
      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View
        style={styles.container}
        flex={1}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          ref={(el) => { this.scrollView = el; }}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >

          {imageArray}
        </ScrollView>

        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  button: {
    position: 'absolute',
    zIndex: 3,
    bottom: 20,
  },
  rightBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
})
