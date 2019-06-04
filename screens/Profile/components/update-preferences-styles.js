import {StyleSheet} from "react-native";
import StyleGuide from "../../../components/theme/StyleGuide";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: StyleGuide.spacing.small
  },
  content: {
    paddingBottom: StyleGuide.spacing.small,
    backgroundColor: StyleGuide.palette.lightGray
  },
  last: {
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginHorizontal: StyleGuide.spacing.small,
    marginTop: StyleGuide.spacing.small,
    marginBottom: 1,
    borderRadius: 5,
    //...StyleGuide.styles.shadow,
  },
  cardHeadline: {
    ...StyleGuide.typography.headline,
    marginBottom: 8,

  },
  cardLinks: {
    ...StyleGuide.typography.subhead,
    paddingTop: StyleGuide.spacing.tiny,
    color: Colors.black,
    marginBottom: 8,
  },
  button: {
    ...StyleGuide.styles.shadow,
    ...StyleGuide.styles.button,
    backgroundColor: StyleGuide.palette.white,
    marginBottom: 0
  },
  buttons: {
    flexDirection: "row",
    paddingTop: StyleGuide.spacing.tiny,
  },
  icon: {
    ...StyleGuide.styles.buttonIcon
  },
  deleteAccount: {
    ...StyleGuide.typography.headline,
    alignItems: 'center',
    color: Colors.secondary,
    textAlign: 'center',
    justifyContent: "center",
    flexDirection: "row",
  },
  genderAlignText: {
    ...StyleGuide.typography.subhead,
    color: Colors.black,
    marginTop: StyleGuide.spacing.tiny,
  },
  leftBlock: {
    flex: 1
  },
  rightBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  rangeSliderText: {
    ...StyleGuide.typography.headline
  },
  pauseMyCardText: {
    ...StyleGuide.typography.headline,
    marginTop: StyleGuide.spacing.tiny
  }
});
//TODO https://github.com/xinthink/rnmk-demo/blob/master/app/toggles.js
//TODO Note:  rangeText="20~35" for RangeSlider
