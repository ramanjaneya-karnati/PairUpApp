import React from "react";
import {View, Image, StyleSheet} from "react-native";
import UserApi from '../../../components/api/data';
import {Text, Container} from '../../../components'
import {Ionicons} from '@expo/vector-icons';
import {getFormValues, reduxForm} from "redux-form";
import {API_FETCH_STATUS_IN_PROGRESS, API_FETCH_STATUS_SUCCESS, FORM_NAMES} from "../../../constants";
import {bindActionCreators} from "redux";
import {Actions, raiseAction} from "../actions";
import {connect} from "react-redux";
import {VIEWS} from "../constants";
import ViewProfile from './view-profile'
import UpdateProfile from './update-profile'
import UpdatePreferences from './update-preferences'
import UpdateImages from './update-images';
import LoginComponent from '../../../screens/Login/components';
import styles from '../styles';

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.raiseAction(Actions.USER_PROFILE_LANDING_COMPONENT_INIT)
  }

  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({tintColor, focused, horizontal}) => (
      <Ionicons
        name={focused ? 'ios-contact' : 'ios-contact'}
        size={horizontal ? 25 : 31}
        style={{color: tintColor}}
      />
    ),
  };

  logout = () => {
    const {navigation} = this.props;
    navigation.navigate("LoginComponent");
  };

  settingScreen = () => {
    const {navigation} = this.props;
    navigation.navigate("SettingsComponent");
  };

  editProfileScreen = () => {
    const {navigation} = this.props;
    navigation.navigate("EditProfileComponent");
  };

  profileImages = () => {
    const {navigation} = this.props;
    navigation.navigate("UserProfileImages");
  };

  render() {

    const {
      userData,
      currentView,
      dispatch,
      handleSubmit,
      navigation,
      submitStatus,
      fetchStatus,
      updateProfileAlert,
      viewProfileSubmitStatus,
      updateImagesAlert,
      alert,
      backupUserData
    } = this.props;
    if (viewProfileSubmitStatus === API_FETCH_STATUS_IN_PROGRESS) {
      return (
        <View style={styles.loaderContainer}>
          <Image style={{width: 150, height: 150}} source={require('../../../assets/images/submitLoader.gif')}/>
        </View>
      )
    }

    if (!userData) {
      return <View/>
    }
    switch (currentView) {
      case VIEWS.VIEW_PROFILE:
        const viewProfileProps = {
          userData,
          dispatch,
          submitStatus,
          updateProfileAlert,
          fetchStatus,
          navigation
        };
        return <ViewProfile {...viewProfileProps}/>;
      case VIEWS.EDIT_PREFERENCES_VIEW:
        const updatePreferencesProps = {
          userData,
          handleSubmit,
          dispatch,
          submitStatus,
          fetchStatus,
          navigation,
          updateProfileAlert,
          backupUserData
        };
        return (
          <UpdateProfile {...updatePreferencesProps}/>
        );
      case VIEWS.EDIT_SETTINGS_VIEW:
        const editSettingsProps = {
          userData,
          handleSubmit,
          dispatch,
          submitStatus,
          fetchStatus,
          navigation,
          alert,
          backupUserData
        };
        return <UpdatePreferences {...editSettingsProps}/>;
      case VIEWS.UPDATE_IMAGES:
        const updateImagesProps = {
          userData,
          handleSubmit,
          dispatch,
          submitStatus,
          fetchStatus,
          updateImagesAlert
        };
        return <UpdateImages {...updateImagesProps}/>;
      default:
        return <View/>
    }
  }

}

function mapStateToProps(state, ownProps) {
  const formData = getFormValues(FORM_NAMES.USER_PROFILE_LANDING_FORM)(state);
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
    form: FORM_NAMES.USER_PROFILE_LANDING_FORM, // a unique name for this form
    touchOnChange: true,
    touchOnBlur: true,
    validate: function (values, dispatch, props) {
    },
    onSubmit: (values, dispatch) => {
      if (values.currentView === VIEWS.EDIT_SETTINGS_VIEW) {
        dispatch(raiseAction(Actions.USER_PREFERENCES_SUBMIT))
      }
      if (values.currentView === VIEWS.EDIT_PREFERENCES_VIEW) {
        dispatch(raiseAction(Actions.USER_PROFILE_UPDATE_SUBMIT))
      }
    }
  }
)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen));

