import * as React from 'react';
import {Header, Icon} from 'react-native-elements';
import {Text, Content, Container} from '../../../components';
import Colors from "../../../constants/Colors";
import {
  View,
  SafeAreaView,
  TextInput,
  Switch, TouchableOpacity, BackHandler, Image
} from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import {USER_PROFILE_LANDING_FORM_KEYS, VIEWS} from '../constants';
import {change, Field} from 'redux-form'
import {API_FETCH_STATUS_IN_PROGRESS, FORM_NAMES, IntlTextEnglish} from '../../../constants'
import styles from './update-profile-styles'
import {Snackbar} from "react-native-paper";

const radio_props = [
  {label: 'Men', value: 0},
  {label: 'Women', value: 1}
];

class EditProfileSubmitComponent extends React.Component {

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

class EditProfileBackComponent extends React.Component {

  constructor(props) {
    super(props);
    this.goBackProfile = this.goBackProfile.bind(this);

  }

  goBackProfile() {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
  }

  render() {
    return <TouchableOpacity onPress={this.goBackProfile} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
      <Icon
        name='arrow-back'
        color='#FFF'
        size={25}
      />
    </TouchableOpacity>
  }
}

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    inputWidth: '99%'
  };
  onTextFocus = () => {
    this.setState({inputWidth: 'auto'})
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  };
  renderInput = ({input: {value, onChange}, ...otherProps}) => {

    const {
      meta: {touched, error}
    } = otherProps;

    let errorMessageUI = (<View></View>);

    if (touched && error) {
      errorMessageUI = (<Text>{error}</Text>)
    }

    return <TextInput
      underlineColorAndroid="transparent"
      style={styles.input}
      value={value}
      onChangeText={onChange}
      multiline={true}
      {...otherProps}

    />
  };
  renderRadio = ({input: {value, onChange}, ...otherProps}) => {
    return <RadioForm
      radio_props={radio_props}
      buttonColor={Colors.primary}
      buttonInnerColor={Colors.primary}
      buttonSize={15}
      initial={value}
      animation={true}
      onPress={onChange}
    />
  };

  renderSwitch = ({input: {onChange}, ...otherProps}) => {
    const {
      isSelected
    } = otherProps;
    return <Switch
      onValueChange={onChange}
      value={isSelected}
    />
  };

  goBack = () => {
    const {dispatch, backupUserData} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.ABOUT_YOURSELF}`, backupUserData.about));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.YOUR_COMPANY}`, backupUserData.company));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.GENDER}`, backupUserData.gender));
    //dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}`, backupUserData));
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {dispatch, handleSubmit, gender, submitStatus, userData, updateProfileAlert} = this.props;
    const that = this;
    const configInterestsUI = userData && userData.activities && userData.activities.map(function (interest, index) {
      return (
        <View style={styles.buttonsFirst} key={index}>
          <View style={styles.leftBlock}>
            <Text style={styles.pauseMyCardText}>{interest.activityName}</Text>
          </View>
          <View style={styles.rightBlock}>
            <Field
              name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.activities[${index}].isSelected`}
              component={that.renderSwitch}
              isSelected={interest.isSelected}/>
          </View>
        </View>
      )
    });

    return (
      <Container>
        <Header
          placement="left"
          backgroundColor={Colors.primary}
          leftComponent={<EditProfileBackComponent {...{dispatch}}/>}
          rightComponent={<EditProfileSubmitComponent {...{handleSubmit, submitStatus}}/>}
          outerContainerStyles={{height: 80}}
          centerComponent={{
            text: 'Edit Profile',
            style: {color: '#fff', fontSize: 17, lineHeight: 22, fontFamily: "Gotham-Rounded-SemiBold"}
          }}
        />
        <Content style={styles.content}>
          <View>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.ABOUT_YOURSELF}</Text>
            <View style={styles.card}>
              <SafeAreaView style={styles.inputBox}>
                <View style={styles.innerInputBox}>
                  <Field
                    name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.ABOUT_YOURSELF}`}
                    numberOfLines={3}
                    component={this.renderInput}/>
                </View>
              </SafeAreaView>

            </View>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.YOUR_COMPANY}</Text>
            <View style={styles.card}>
              <SafeAreaView style={styles.inputBox}>
                <View style={styles.innerInputBox}>
                  <Field
                    placeholder="Your Company"
                    name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.YOUR_COMPANY}`}
                    numberOfLines={2}
                    component={this.renderInput}/>
                </View>
              </SafeAreaView>
            </View>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.GENDER}</Text>
            {(userData.gender === 1 || userData.gender === 0) &&
            <View style={styles.card}>
              <View style={styles.radioButton}>
                <Field
                  name={`${USER_PROFILE_LANDING_FORM_KEYS.USER_DATA}.${USER_PROFILE_LANDING_FORM_KEYS.GENDER}`}
                  component={this.renderRadio}
                  value={gender}
                />
              </View>
            </View>
            }
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.YOUR_INTERESTS}</Text>
            <View style={styles.interestCard}>
              {configInterestsUI}
            </View>
          </View>
        </Content>
        <Snackbar style={{backgroundColor: "#FF5864"}} visible={updateProfileAlert.type}>
          <Text style={styles.notificationText}>{updateProfileAlert.message}</Text>
        </Snackbar>
      </Container>
    )
  }
}
