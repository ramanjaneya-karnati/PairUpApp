// @flow
import * as React from "react";
import {FlatList, StatusBar, StyleSheet, View, Animated, Dimensions} from "react-native";
import StickyNavigationBar from "./StickyNavigationBar";

import {withTheme, StyleGuide, type StyleProps, type ThemeProps} from "./theme";
import Colors from '../constants/Colors'
type Item = {
  id: string
};

type FeedProps<T> = ThemeProps & StyleProps<*> & {
  data: T[],
  renderItem: T => React.Node,
  title: string,
  header?: React.Node,
  titleStyle?: Style,
  back?: string,
  numColumns?: number,
  inverted?: boolean
};

type FeedState = {
  scrollAnimation: Animated.Value
};

const {height} = Dimensions.get("window");
const keyExtractor = <T: Item>(item: T): string => item.id;

class Feed<T: Item> extends React.Component<FeedProps<T>, FeedState> {

  state = {
    scrollAnimation: new Animated.Value(0)
  };

  renderItem = (item: { item: T }): React.Node => {
    const {renderItem} = this.props;
    return renderItem(item.item);
  };
  render(): React.Node {
    const {renderItem} = this;
    const {data, title, back, header, numColumns, style, inverted, navigation, dispatch} = this.props;
    const {scrollAnimation} = this.state;
    const translateY = scrollAnimation.interpolate({
      inputRange: [55, 56, 57],
      outputRange: [55, 0, 0]
    });
    const backgroundScroll = scrollAnimation.interpolate({
      inputRange: [0, height],
      outputRange: [0, -height],
      extrapolate: "clamp"
    });
    const onScroll = Animated.event(
      [{
        nativeEvent: {
          contentOffset: {
            y: scrollAnimation
          }
        }
      }],
      {useNativeDriver: true}
    );
    const titleStyle = back ? {} : {transform: [{translateY}]};
    const top = Colors.primary;
    const bottom = Colors.secondary;
    return (
      <View style={styles.flex}>
        <View style={{...StyleSheet.absoluteFillObject }}>
          {
            !back && (
              <Animated.View
                style={{flex: 1, transform: [{translateY: backgroundScroll}]}}
              />
            )
          }
        </View>
        <StickyNavigationBar dispatch={dispatch} navigation={navigation}/>
        <AnimatedFlatList
          contentContainerStyle={[styles.container, style]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          columnWrapperStyle={(numColumns && numColumns > 0) ? styles.columnWrapperStyle : undefined}
          {...{data, keyExtractor, renderItem, onScroll, numColumns, inverted}}
        />

      </View>
    );
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    paddingBottom: StyleGuide.spacing.small,
    backgroundColor: StyleGuide.palette.white
  },
  header: {
    padding: StyleGuide.spacing.tiny,
  },
  headerText: {
    color: "#A237F3",
    textAlign: "center"

  },
  extraHeader: {
    backgroundColor: StyleGuide.palette.white,
    ...StyleGuide.styles.shadow
  },
  columnWrapperStyle: {
    marginRight: StyleGuide.spacing.small,
    marginTop: StyleGuide.spacing.tiny
  },
  mainHeader: {
    marginTop:30,
  },
  bodyContainer:{
    borderTopColor:Colors.primary,
    borderWidth: 10,
    borderTopEndRadius:20,
    borderTopLeftRadius:20
  }
});

export default withTheme(Feed);
