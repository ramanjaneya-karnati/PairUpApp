// @flow
import * as React from "react";

import {Actions, raiseAction} from "../actions";
import {getFormValues, reduxForm} from "redux-form";
import {API_FETCH_STATUS_IN_PROGRESS, FORM_NAMES} from "../../../constants";
import {VIEWS} from '../constants';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Image, View} from "react-native";
import PairCenters from './pair-centers';
import PairCenterDetails from './pair-center-detail-screen';
import UserProfileView from './user-profile-view';
import UsersLikedScreen from './users-liked';
import {Ionicons} from "@expo/vector-icons";
import {IntlTextEnglish} from '../../../constants'
import UserProfileViewScreen from './single-user-liked-profile';
import styles from './pair-center-detail-styles';


class PairCentersScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Pairs',
    tabBarIcon: ({tintColor, focused, horizontal}) => (
      <Ionicons
        name={focused ? 'ios-pin' : 'ios-pin'}
        size={horizontal ? 25 : 31}
        style={{color: tintColor}}
      />
    ),
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.raiseAction(Actions.PAIR_CENTERS_COMPONENT_INIT);
  }

  render() {

    const {
      pairCentersData,
      currentView,
      dispatch,
      handleSubmit,
      submitStatus,
      fetchStatus,
      selectedPairCenterId,
      selectedUserIdData,
      addUserToLocale,
      likedUsersList,
      interestedUsers,
      singleUserLikedProfileData,
      navigation
    } = this.props;

    if (fetchStatus === API_FETCH_STATUS_IN_PROGRESS || submitStatus === API_FETCH_STATUS_IN_PROGRESS) {
      return (
        <View style={styles.loaderContainer}>
          <Image style={{width: 150, height: 150}} source={require('../../../assets/images/submitLoader.gif')}/>
        </View>
      )
    }
    if (!pairCentersData) {
      return <View/>
    }
    switch (currentView) {
      case VIEWS.PAIR_CENTERS_SCREEN:
        const title = IntlTextEnglish.APPLICATION.PAIR_CENTERS_LANDING_SCREEN_TITLE;
        const pairCenterProps = {
          pairCentersData,
          title,
          dispatch,
          submitStatus,
          navigation
        };
        return <PairCenters {...pairCenterProps}/>;
      case VIEWS.PAIR_CENTER_DETAIL_SCREEN:
        //const pairCenterSelectedData = pairCentersData.map(e => e.id).indexOf(selectedPairCenterId);
        const pairCenterDetailsProps = {
          handleSubmit,
          dispatch,
          fetchStatus,
          addUserToLocale,
          pairCenterSelectedData: selectedPairCenterId,
          interestedUsers,

        };
        return (
          <PairCenterDetails {...pairCenterDetailsProps}/>
        );
      case VIEWS.USER_PROFILE_VIEW:
        const userProfileProps = {
          handleSubmit,
          dispatch,
          selectedUserIdData,
          submitStatus,
        };
        return (
          <UserProfileView {...userProfileProps}/>
        );
      case VIEWS.USERS_LIKED_SCREEN:
        const usersLikedScreenProps = {
          handleSubmit,
          dispatch,
          submitStatus,
          users: likedUsersList,
          modalOpen: {
            visible: true
          }
        };
        return (
          <UsersLikedScreen {...usersLikedScreenProps}/>
        );
      case VIEWS.SINGLE_USER_LIKED_PROFILE_VIEW:

        const singleUserLikedProfileProps = {
          dispatch,
          firstName: singleUserLikedProfileData.name,
          images: [{
            url: singleUserLikedProfileData.profilePictures[0].url
          }],
          ...singleUserLikedProfileData,
          modalOpen: {
            visible: true
          }
        };
        return (
          <UserProfileViewScreen {...singleUserLikedProfileProps}/>
        );
      default:
        return <View/>
    }
  }
}

function mapStateToProps(state, ownProps) {
  const formData = getFormValues(FORM_NAMES.PAIR_CENTERS_FORM)(state);
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
  form: FORM_NAMES.PAIR_CENTERS_FORM, // a unique name for this form
  touchOnChange: true,
  touchOnBlur: true,
  validate: function (values, dispatch) {
  },
  onSubmit: (values, dispatch) => {

    /*if (values.currentView === VIEWS.PAIR_CENTER_DETAIL_SCREEN) {
      dispatch(raiseAction(Actions.USER_PROFILE_UPDATE_SUBMIT))
    }
    if (values.currentView === VIEWS.EDIT_PREFERENCES_VIEW) {
      dispatch(raiseAction(Actions.USER_PREFERENCES_SUBMIT))
    }*/
  }
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(PairCentersScreen));
