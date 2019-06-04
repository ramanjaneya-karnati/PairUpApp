import {StyleSheet} from "react-native";
import StyleGuide from "../../../components/theme/StyleGuide";
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
  container: {
    marginHorizontal: StyleGuide.spacing.small,
    flex: 1,
    justifyContent: "center",
  },
  avatar: {
    borderRadius: 45,
    borderWidth: 2,
    borderColor: StyleGuide.palette.white,
    marginVertical: StyleGuide.spacing.tiny,
  },
  text: {
    textAlign: "center",
    marginBottom: StyleGuide.spacing.tiny
  },
  content: {
    backgroundColor: StyleGuide.palette.white,
  },
  iconHeader: {
    ...StyleGuide.typography.headline
  },
  iconSubHeader: {
    ...StyleGuide.typography.subhead
  },
  button: {
    ...StyleGuide.styles.shadow,
    ...StyleGuide.styles.button,
    backgroundColor: StyleGuide.palette.white,
    marginBottom: 0
  },
  icon: {
    ...StyleGuide.styles.buttonIcon
  },
  cardContainer: {
    flexDirection: "row",
    paddingTop: StyleGuide.spacing.small,
    marginBottom: 80
  },
  imageUploadIcon: {
    padding: StyleGuide.spacing.small,
    marginHorizontal: StyleGuide.spacing.small,
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between"
  },
  profileNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: StyleGuide.spacing.small
  },
  profileName: {
    color: StyleGuide.palette.white,
    fontSize: 20,
    lineHeight: 25,
    paddingTop: StyleGuide.spacing.tiny
  },
  profileBodyLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20
  },
  linkLabel: {
    justifyContent: "flex-start"
  },
  linkIcon: {
    justifyContent: "flex-end"
  },
  label: {
    fontSize: 16,
    color: "#666666"
  },
  separator: {
    ...StyleGuide.styles.separator,
    paddingLeft: 30,
    paddingRight: 30
  },
  closeIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: StyleGuide.spacing.large,
    paddingRight: StyleGuide.spacing.base
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    backgroundColor: '#fff',
  }

});
