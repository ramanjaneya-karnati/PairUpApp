import {StyleSheet} from "react-native";
import StyleGuide from "../../../components/theme/StyleGuide";
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primary
  },
  content: {
    backgroundColor: StyleGuide.palette.lightGray,
  },
  buttons: {
    flexDirection: "row",
    paddingTop: StyleGuide.spacing.tiny,
    paddingHorizontal: StyleGuide.spacing.small
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between"
  },
  interestOption: {
    marginHorizontal: StyleGuide.spacing.small
  },
  address: {
    paddingTop: StyleGuide.spacing.tiny
  },
  interestedHeadline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginBottom: 1
  },
  InterestedThumbs: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: StyleGuide.spacing.tiny
  },
  userImages: {
    ...StyleGuide.styles.borderRadius,
    width: 80,
    marginRight: 10
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  localeThumbnail: {
    width: 80,
    height: 80,
    marginRight: StyleGuide.spacing.small,
    ...StyleGuide.styles.borderRadius,
    justifyContent: 'flex-start',
  },
  addressContainerRight: {
    flex: 1,
    marginHorizontal: StyleGuide.spacing.tiny,
  },
  addressLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressLabelRight: {
    justifyContent: 'flex-start',
  },
  addressMapPointer: {
    justifyContent: "flex-end",
  },
  textColor: {
    color: "#333333"
  },
  reportContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginBottom: 2
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginBottom: 2
  },
  reportTextLink: {
    color: StyleGuide.palette.darkGray,
    textAlign: "center"
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    backgroundColor: Colors.primary,
    borderColor: Colors.primary
  },
  icon: {
    ...StyleGuide.styles.buttonIcon
  },
  spaceAlign: {
    paddingRight: StyleGuide.spacing.small,
    paddingTop: 5,
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Gotham-Rounded-SemiBold",
    color: StyleGuide.palette.white
  },
  reportBody: {
    color: StyleGuide.palette.darkGray,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Gotham-Rounded-SemiBold",
    lineHeight: 25,
    paddingBottom: 20
  },
  separator: {
    ...StyleGuide.styles.separator,
  },
  reportContent: {
    flexDirection: "row"
  },
  subhead: {
    color: StyleGuide.palette.darkGray
  },
  radio: {
    paddingHorizontal: StyleGuide.spacing.tiny,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    padding: StyleGuide.spacing.tiny,
    paddingTop: 15,
    paddingBottom: 10,
  },
  semiOpaque: {
    opacity: 0.5
  },
  opaque: {
    opacity: 1
  }
});
