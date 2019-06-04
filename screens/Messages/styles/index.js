import {StyleSheet} from "react-native";
import {StyleGuide} from "../../../components";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: StyleGuide.spacing.small,
  },
  headLine: {
    fontSize: 20,
    color: "#FF5864",
    paddingVertical: StyleGuide.spacing.base,
    ...StyleGuide.styles.fonts.headline
  },
  matchedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10
  },
  matchedUserImages: {
    ...StyleGuide.styles.borderRadius,
    width: 100,
    marginRight: 10
  },
  notificationUserImages: {
    borderRadius: 55,
    width: 80,
    height: 80,
    marginRight: 10
  },
  user: {
    flexDirection: "row",
    alignItems: "stretch"
  },
  username: {
    marginLeft: StyleGuide.spacing.tiny
  },
  headline: {
    fontSize: 18,
    color: '#FF5864',
    lineHeight: 17,
    marginTop: 25,
    ...StyleGuide.styles.fonts.headline
  },
  subhead: {
    fontSize: 15,
    color: StyleGuide.palette.gray,
    ...StyleGuide.styles.fonts.body
  }
});
