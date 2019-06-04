import React from 'react'
import {Button, StyleSheet, View, Dimensions, Animated, ImageBackground} from 'react-native'
import Octicons from "@expo/vector-icons/Octicons";
import {StyleGuide, Image, Text} from '../../../components';
import {API_FETCH_STATUS_IN_PROGRESS, Colors, FORM_NAMES} from "../../../constants";
import {getFormValues, reduxForm} from "redux-form";
import {bindActionCreators} from "redux";
import {Actions, raiseAction} from "../actions";
import connect from "react-redux/es/connect/connect";
import styles from "../../PairCenters/components/pair-center-detail-styles";
import {VIEWS} from "../constants";
import UserCardsView from "../components/user-cards";
import SelectedUserView from '../components/single-user-profile';

class UserCards extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: 'Swipe',
    tabBarIcon: ({tintColor, focused, horizontal}) => (
      <Octicons
        name={focused ? 'flame' : 'flame'}
        size={horizontal ? 25 : 31}
        style={{color: tintColor}}
      />
    ),
  };

  componentDidMount() {
    const {actions} = this.props;
    actions.raiseAction(Actions.USER_CARDS_COMPONENT_INIT);
  }

  render() {
    const {
      userCardsData,
      selectedUserData,
      currentView,
      dispatch,
      navigation,
      submitStatus
    } = this.props;

    /*  if (submitStatus === API_FETCH_STATUS_IN_PROGRESS) {
        return (
          <View style={styles.loaderContainer}>
            <Image style={{width: 150, height: 150}} source={require('../../../assets/images/submitLoader.gif')}/>
          </View>
        )
      }*/
    /* if (!userCardsData) {
       return <View/>
     }*/
    switch (currentView) {
      case VIEWS.USER_CARDS_VIEW:
        const userCardsViewProps = {
          dispatch,
          navigation
        };
        return <UserCardsView {...userCardsViewProps}/>;
      case VIEWS.SELECTED_USER_VIEW:
        const selectedUserViewProps = {
          dispatch,
          selectedUserData,
          firstName: selectedUserData.name,
          age: selectedUserData.age,
          company: selectedUserData.company,
          about: selectedUserData.about,
          images: [
            {url: selectedUserData.image}
          ],
          modalOpen: {
            visible: true
          }
        };
        return <SelectedUserView {...selectedUserViewProps}/>;
      default:
        return <View/>
    }
  }
}


function mapStateToProps(state, ownProps) {
  const formData = getFormValues(FORM_NAMES.USER_CARDS_FORM)(state);
  return {
    ...ownProps,
    ...state,
    ...formData
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    actions: bindActionCreators({raiseAction}, dispatch)
  };
}

export default reduxForm({
  form: FORM_NAMES.USER_CARDS_FORM, // a unique name for this form
  touchOnChange: true,
  touchOnBlur: true,
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCards));
