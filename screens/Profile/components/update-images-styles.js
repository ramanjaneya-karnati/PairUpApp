import {StyleSheet} from "react-native";
import StyleGuide from "../../../components/theme/StyleGuide";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: StyleGuide.spacing.tiny
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    ...StyleGuide.styles.borderRadius,
    height: 150,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderRadius: 10
  },
  wrapperSpacing: {
    padding: StyleGuide.spacing.tiny,

  },
  rightBlock: {
    alignSelf: "flex-end",
    position: 'absolute',
    bottom:0

  },
  userImages:{
    ...StyleGuide.styles.borderRadius

  }
});
