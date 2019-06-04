import * as React from 'react';
import {
  Switch,
  View,
  TouchableOpacity, BackHandler, AsyncStorage, Image, Text
} from 'react-native';
import {Content, Container, StyleGuide} from '../../../components';
import {Header, Icon} from 'react-native-elements';
import Colors from '../../../constants/Colors';
import {change, Field} from 'redux-form'
import {API_FETCH_STATUS_IN_PROGRESS, FORM_NAMES, IntlTextEnglish} from '../../../constants';
import {USER_PROFILE_LANDING_FORM_KEYS, VIEWS} from '../constants';
import {MKRangeSlider} from 'react-native-material-kit';
import styles from './update-preferences-styles';
import {withNavigation} from 'react-navigation';
import {Snackbar} from "react-native-paper";
import {reset} from 'redux-form';


class PreferencesSubmitComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {handleSubmit, submitStatus} = this.props;
    return (
      submitStatus === API_FETCH_STATUS_IN_PROGRESS ?
        <View style={{top: 15, left: 15, right: 10}}>
          <Image style={{width: 50, height: 50}} source={require('../../../assets/images/submitLoader.gif')}/>
        </View> :
        <TouchableOpacity onPress={handleSubmit} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          <Icon
            name='check'
            color='#FFF'
            size={25}
          />
        </TouchableOpacity>)
  }
}

class PreferencesBackComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  goBackProfile = () => {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
  };

  render() {
    const {navigation} = this.props;
    return <TouchableOpacity onPress={this.goBackProfile} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
      <Icon
        name='arrow-back'
        color='#FFF'
        size={25}
      />
    </TouchableOpacity>
  }
}

export default class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  goBack = () => {
    const {dispatch, navigation, backupUserData} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_MEN}`, backupUserData.lookingForMen));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_WOMEN}`, backupUserData.lookingForWomen));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.HIDE_MY_AGE}`, backupUserData.hideAge));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.PAUSE_MY_CARD}`, backupUserData.isVisible));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.PREFERRED_AGE_MIN}`, backupUserData.preferredAgeRangeMin));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.PREFERRED_AGE_MAX}`, backupUserData.preferredAgeRangeMax));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  logOutUser = async () => {
    try {
      const {navigation} = this.props;
      AsyncStorage.removeItem("userToken");
      navigation.navigate("LoginComponent");
    } catch (e) {
      console.log("Error in Logging User")
    }


  };
  renderSwitch = ({input: {name, onChange}, ...otherProps}) => {
    const {
      isSelected,
      onChangeHandler
    } = otherProps;
    return <Switch
      onValueChange={(value) => {
        if (onChangeHandler) {
          onChangeHandler(value)
        } else {
          onChange(value)
        }
      }}
      value={isSelected}
    />
  };

  renderRangeSlider = ({input: {onChange}, ...otherProps}) => {
    const {
      minValue,
      maxValue,
      onChangeHandler
    } = otherProps;
    return <MKRangeSlider
      min={18}
      max={60}
      thumbRadius={10}
      minValue={minValue}
      maxValue={maxValue}
      lowerTrackColor={Colors.primary}
      upperTrackColor={Colors.tabIconDefault}
      style={styles.slider}
      onChange={onChangeHandler}
    />
  };

  onGenderPreferenceChange = (key, value) => {
    const {
      userData: {
        lookingForWomen,
        lookingForMen,
      },
      dispatch
    } = this.props;
    if (key === USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_MEN) {
      dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_MEN}`, value));
      if (!lookingForWomen && !value) {
        dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_WOMEN}`, true));
      }
    }

    if (key === USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_WOMEN) {
      dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_WOMEN}`, value));
      if (!lookingForMen && !value) {
        dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_MEN}`, true));
      }
    }
  };

  render() {
    const {visible} = this.state;
    const {navigation, submitStatus, userData, ageRange, handleSubmit, dispatch, alert} = this.props;
    const {
      preferredAgeRangeMax,
      preferredAgeRangeMin,
      lookingForMen,
      lookingForWomen,
      hideAge,
      isVisible
    } = userData;
    const that = this;

    return (
      <Container>
        <Header
          placement="left"
          backgroundColor={Colors.primary}
          leftComponent={<PreferencesBackComponent {...{dispatch}}/>}
          rightComponent={<PreferencesSubmitComponent {...{handleSubmit, submitStatus}}/>}
          outerContainerStyles={{height: 80}}
          centerComponent={{
            text: 'SETTINGS',
            style: {color: '#fff', fontSize: 17, lineHeight: 22, ...StyleGuide.styles.fonts.headline}
          }}
        />

        <Content style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.LOOKING_FOR}</Text>
            <View style={styles.buttons}>
              <View style={styles.leftBlock}>
                <Text style={styles.genderAlignText}>{IntlTextEnglish.USER.LOOKING_FOR_MEN}</Text>
              </View>
              <View style={styles.rightBlock}>
                <Field
                  name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_MEN}`}
                  component={this.renderSwitch}
                  isSelected={lookingForMen}
                  onChangeHandler={function (value) {
                    that.onGenderPreferenceChange(USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_MEN, value)
                  }}
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <View style={styles.leftBlock}>
                <Text style={styles.genderAlignText}>{IntlTextEnglish.USER.LOOKING_FOR_WOMEN}</Text>
              </View>
              <View style={styles.rightBlock}>
                <Field
                  name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_WOMEN}`}
                  component={this.renderSwitch}
                  isSelected={lookingForWomen}
                  onChangeHandler={function (value) {
                    that.onGenderPreferenceChange(USER_PROFILE_LANDING_FORM_KEYS.LOOKING_FOR_WOMEN, value)
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.buttons}>
              <View style={styles.leftBlock}>
                <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.AGE_RANGE}</Text>
              </View>
              <View style={styles.rightBlock}>
                <Text style={styles.cardHeadline}>
                  {`${preferredAgeRangeMin.toFixed(0)}-${preferredAgeRangeMax.toFixed(0)}`}
                </Text>
              </View>
            </View>
            <Field
              name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}`}
              component={this.renderRangeSlider}
              ageRange={ageRange}
              maxValue={preferredAgeRangeMax}
              minValue={preferredAgeRangeMin}
              onChangeHandler={function (data) {
                dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.PREFERRED_AGE_MAX}`
                  , data.max));
                dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.PREFERRED_AGE_MIN}`
                  , data.min));
              }}
            />
          </View>
          <View style={styles.card}>
            <View style={styles.buttons}>
              <View style={styles.leftBlock}>
                <Text style={styles.pauseMyCardText}>{IntlTextEnglish.USER.PAUSE_MY_CARD}</Text>
              </View>
              <View style={styles.rightBlock}>
                <Field
                  name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.PAUSE_MY_CARD}`}
                  component={this.renderSwitch}
                  isSelected={isVisible}
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <View style={styles.leftBlock}>
                <Text style={styles.pauseMyCardText}>{IntlTextEnglish.USER.HIDE_MY_AGE}</Text>
              </View>
              <View style={styles.rightBlock}>
                <Field
                  name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.HIDE_MY_AGE}`}
                  component={this.renderSwitch}
                  isSelected={hideAge}
                />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.APPLICATION.CONTACT_US}</Text>
            <Text style={styles.cardLinks}>{IntlTextEnglish.APPLICATION.EMAIL}</Text>
            <Text style={styles.cardLinks}>{IntlTextEnglish.APPLICATION.FAQ}</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity onPress={this.logOutUser}>
              <Text style={styles.deleteAccount}>{IntlTextEnglish.APPLICATION.LOGOUT}</Text>
            </TouchableOpacity>
          </View>
        </Content>
        <Snackbar style={{backgroundColor: "#FF5864"}} visible={alert.type}>
          <Text style={{fontSize:16, ...StyleGuide.styles.fonts.headline}}>{alert.message}</Text>
        </Snackbar>
      </Container>
    )
  }
}



