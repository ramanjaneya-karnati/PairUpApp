import {Dimensions, StyleSheet} from "react-native";
import StyleGuide from "../../../components/theme/StyleGuide";

export default StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 30,
    backgroundColor:StyleGuide.palette.transparent
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
  },
  card: {
    padding: StyleGuide.spacing.small,
    marginHorizontal: StyleGuide.spacing.small,
    marginTop: StyleGuide.spacing.xLarge,
    borderRadius:30,
    borderWidth:2,
    borderColor:"#A237F3",
    justifyContent: 'space-around',
  },
  logOut:{
    ...StyleGuide.typography.title4,
    alignItems: 'center',
    color:"#A237F3",
    textAlign: 'center',
    justifyContent: "center",
  },
});
