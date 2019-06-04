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
  leftBlock: {
    flex: 1
  },
  input: {
    paddingLeft: 15,
    flex: 1,
    padding: StyleGuide.spacing.tiny,
    marginRight: StyleGuide.spacing.tiny,
    ...StyleGuide.styles.borderRadius,
    ...StyleGuide.typography.callout,
  },
  radio:{
    flex: 1,
    padding: StyleGuide.spacing.tiny,
    marginRight: StyleGuide.spacing.tiny,
  },
  buttons: {
    flexDirection: "row",
    paddingTop: StyleGuide.spacing.tiny,
  },
  radioButton: {
    padding: StyleGuide.spacing.tiny
  },

  profileSummary:{
    paddingTop:StyleGuide.spacing.small,
    color:StyleGuide.palette.darkGray,
    fontSize:16,
    textAlign: 'center',
    marginBottom:5
  },
  buttonContainer:{
    padding:StyleGuide.spacing.base
  },
  notificationText:{
    fontSize: 16,
    ...StyleGuide.styles.fonts.headline,
    color:StyleGuide.palette.white
  }
});
