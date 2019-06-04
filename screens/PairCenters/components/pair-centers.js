// @flow
import * as React from "react";
import {Feed, Card} from '../../../components';
import {change} from "redux-form";
import {FORM_NAMES} from "../../../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from "../constants";
import {Actions, raiseAction} from "../actions";
import {withNavigation} from 'react-navigation';
import events from 'events';


export default class PairCentersScreen extends React.Component {

  renderItem = (category) => {
    const {dispatch} = this.props;
    const cardProps = {
      title: category.localeName,
      subtitle: category.activityName,
      picture: {
        preview: category.url
      },
      icon: {
        name: "info-outline",
        type: "material",
        size: 30,
        color: 'white'
      },
      dispatch,
      address: category.address,
      id: category.id,
      locale: category,
      onPress: () => {
        dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.PAIR_CENTER_DETAIL_SCREEN));
        dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.IS_SELECTED_PAIR_CENTER}`, category));
        dispatch(raiseAction(Actions.GET_USERS_BY_LOCALE));
      }
    };
    return (<Card {...cardProps} />);
  };

  constructor(props) {
    super(props);
  }
  render() {
    const {renderItem} = this;
    const {
      pairCentersData,
      submitStatus, dispatch,
      navigation,
      onPress
    } = this.props;
    return <Feed {...{data: pairCentersData, renderItem, dispatch, navigation}} />
  }

}
