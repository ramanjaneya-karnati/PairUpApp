import {StyleSheet} from "react-native";
import {StyleGuide} from "../../../components";

const topGradient = ["rgba(0,0,0,0.8)", "transparent"];
const bottomGradient = ["transparent", "rgba(0,0,0,0.8)"];
const subtitle = "rgba(255, 255, 255, 0.7)";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  gutter: {
    backgroundColor: StyleGuide.palette.white,
    marginTop:StyleGuide.spacing.small,
    justifyContent: 'center',
    elevation:4

  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: StyleGuide.spacing.small,
    justifyContent: 'center',
    width: 340,

  },
  image: {
    ...StyleGuide.styles.borderRadius,
    height: 580,


  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  gradient: {
    padding: StyleGuide.spacing.small,
    ...StyleGuide.styles.borderRadius,

  },
  subtitle: {
    color: subtitle,
    fontSize: 15
  },
  actionButtons:{
    backgroundColor:StyleGuide.palette.transparent,
    padding:StyleGuide.spacing.small,
    flexDirection: "row",
    justifyContent: 'center',


  },
})
