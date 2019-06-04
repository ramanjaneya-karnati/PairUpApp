import {Dimensions, StyleSheet} from "react-native";
import StyleGuide from "../../../components/theme/StyleGuide";


export default StyleSheet.create({
  container: {
    marginTop: StyleGuide.spacing.small,
    marginHorizontal: StyleGuide.spacing.small,
    flex: 1,
    justifyContent: "center"
  },
  content: {
    paddingBottom: StyleGuide.spacing.small,
    backgroundColor: '#F3F3F3'
  },
  card: {
    backgroundColor: StyleGuide.palette.white,
    marginTop: StyleGuide.spacing.tiny,
    marginBottom: 1,
    borderRadius: 5,
  },
  cardHeadline: {
    ...StyleGuide.typography.headline,
    paddingTop: StyleGuide.spacing.tiny,
    paddingLeft: StyleGuide.spacing.tiny,

  },
  inputBox: {
    backgroundColor: StyleGuide.palette.white
  },
  innerInputBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: StyleGuide.palette.errorBorder
  },
  leftBlock: {
    flex: 1
  },
  button: {
    ...StyleGuide.styles.shadow,
    ...StyleGuide.styles.button,
    backgroundColor: StyleGuide.palette.white,
    marginBottom: 0
  },
  rightBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  input: {
    paddingLeft: 15,
    marginRight: StyleGuide.spacing.tiny,
    ...StyleGuide.styles.borderRadius,
    ...StyleGuide.typography.callout,
  },
  buttons: {
    flexDirection: "row",
    paddingTop: StyleGuide.spacing.tiny,
  },
  buttonsFirst: {
    flexDirection: "row",
    paddingTop: StyleGuide.spacing.tiny
  },
  radioButton: {
    padding: StyleGuide.spacing.tiny
  },
  pauseMyCardText: {
    ...StyleGuide.typography.headline,
    marginTop: StyleGuide.spacing.tiny
  },
  interestCard: {

    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginTop: StyleGuide.spacing.small,
    borderRadius: 5,
    ...StyleGuide.styles.shadow,
  },
  spinnerTextStyle: {
    color: StyleGuide.palette.white
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText:{
    fontSize: 16,
    ...StyleGuide.styles.fonts.headline,
    color:StyleGuide.palette.white
  }
});
