import {StyleSheet} from "react-native";
import StyleGuide from "../../../components/theme/StyleGuide";

export default StyleSheet.create({
  container: {
    marginHorizontal: StyleGuide.spacing.small,
    flex: 0.9,
    justifyContent: "center",
  },
  closeIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: StyleGuide.spacing.base,
    paddingRight: StyleGuide.spacing.base
  },
  gridView: {
    paddingTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    ...StyleSheet.absoluteFillObject
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',

  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  itemSummaryHeadline:{
    fontSize: 20,
    color: '#fff',
    fontWeight: '600'
  },
  itemSummarySubHead:{
    paddingTop:StyleGuide.spacing.small,
    fontSize: 18,
    color: '#fff',
    fontWeight:'400'
  },
  itemSummaryContainer:{
    padding:StyleGuide.spacing.base,
    position:'absolute',
    bottom:20
  },
  gradient: {
    padding: StyleGuide.spacing.tiny,
    ...StyleGuide.styles.borderRadius
  },
})
