import * as React from 'react';
import {Header, Icon} from 'react-native-elements';
import {Text, Content, Container, Button, StyleGuide} from '../../../components';
import {Actions, raiseAction} from '../actions'
import Colors from "../../../constants/Colors";
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import {MAIN_APP_FORM_VALUES} from '../../../constants';
import {Field, getFormValues, reduxForm} from 'redux-form'
import {FORM_NAMES, IntlTextEnglish} from '../../../constants'
import styles from '../styles'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {DatePicker, Item} from 'native-base'
import {Snackbar} from "react-native-paper";

const radio_props = [
  {label: 'Men', value: 0},
  {label: 'Women', value: 1}
];
const validate = values => {
  const error = {};
  error.firstName = '';
  error.lastName = '';
  error.gender = '';
  error.dob = '';
  let nm = values.firstName;
  let lm = values.lastName;
  let gr = values.gender;
  let db = values.dob;

  if (values.firstName === undefined) {
    nm = '';
  }
  if (values.lastName === undefined) {
    lm = '';
  }
  if (values.gender === undefined) {
    gr = '';
  }
  if (values.dob === undefined) {
    db = '';
  }
  if (nm.length < 3) {
    error.firstName = 'min 3 characters';
  }
  if (lm.length < 3) {
    error.lastName = 'min 3 characters';
  }
  if (gr.length < 1) {
    error.gender = 'select a gender'
  }
  if (db == "") {
    error.dob = 'your birthday'
  }
  return error;
};


class BasicProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date()};
    this.setDate = this.setDate.bind(this);
  }

  static defaultProps = {
    alert: {
      type: false
    }
  };

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  renderInput = ({input: {value, onChange}, ...otherProps,}) => {
    const {meta: {error}} = otherProps;
    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>

        <TextInput
          underlineColorAndroid="transparent"
          style={styles.input}
          blurOnSubmit={false}
          value={value}
          editable={true}
          onChangeText={onChange}
          multiline={true}
          {...otherProps}
        />
        {hasError ? <Text>{error}</Text> : <Text/>}
      </Item>)
  };
  renderRadio = ({input: {value, onChange}, ...otherProps}) => {
    const {meta: {error}} = otherProps
    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <RadioForm
          radio_props={radio_props}
          buttonColor={Colors.primary}
          style={styles.radio}
          buttonInnerColor={Colors.primary}
          buttonSize={15}
          initial={value}
          animation={true}
          onPress={onChange}
        />
        {hasError ? <Text style={{justifyContent: "flex-end"}}>{error}</Text> : <Text/>}
      </Item>)
  };
  renderDate = ({input: {value, onChange}, ...otherProps}) => {
    const {meta: {error}} = otherProps
    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <View style={styles.radio}>
          <DatePicker
            defaultDate={new Date(1991, 3, 11)}
            minimumDate={new Date(1975, 1, 1)}
            maximumDate={new Date(2000, 1, 1)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="YYYY-MM-DD"
            textStyle={{color: "green"}}
            placeHolderTextStyle={{color: "#d3d3d3"}}
            onDateChange={onChange}
          />
        </View>
        {hasError ? <Text style={{justifyContent: "flex-end"}}>{error}</Text> : <Text/>}
      </Item>)
  };

  render() {
    const {gender, handleSubmit, alert} = this.props;
    return (
      <Container>
        <Header
          placement="left"
          backgroundColor={Colors.primary}
          outerContainerStyles={{height: 80}}
          centerComponent={{
            text: 'Basic Profile',
            style: {color: '#fff', fontSize: 17, lineHeight: 22, fontFamily: "Gotham-Rounded-SemiBold"}
          }}
        />
        <Content style={styles.content}>
          <View>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.FIRST_NAME}</Text>
            <View style={styles.card}>
              <SafeAreaView style={styles.inputBox}>
                <View style={styles.innerInputBox}>
                  <Field
                    placeholder="Eg: John"
                    name="firstName"
                    numberOfLines={2}
                    component={this.renderInput}/>
                </View>
              </SafeAreaView>
            </View>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.LAST_NAME}</Text>
            <View style={styles.card}>
              <SafeAreaView style={styles.inputBox}>
                <View style={styles.innerInputBox}>
                  <Field
                    placeholder="Eg: John"
                    name={`${MAIN_APP_FORM_VALUES.LAST_NAME}`}
                    numberOfLines={2}
                    component={this.renderInput}/>
                </View>
              </SafeAreaView>
            </View>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.GENDER}</Text>
            <View style={styles.card}>
              <View style={styles.radioButton}>
                <Field
                  name="gender"
                  component={this.renderRadio}
                  value={gender}
                />
              </View>
            </View>
            <Text style={styles.cardHeadline}>{IntlTextEnglish.USER.BIRTHDAY}</Text>
            <View style={styles.card}>
              <Field
                name="dob"
                component={this.renderDate}
              />
            </View>
            <Text style={styles.profileSummary}>{IntlTextEnglish.APPLICATION.BASIC_PROFILE_SUMMARY_TEXT}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button label="Submit" primary onPress={handleSubmit}/>
          </View>
        </Content>
        <Snackbar style={{backgroundColor: "#FF5864"}} visible={alert.type}>
          <Text style={styles.notificationText}>{alert.message}</Text>
        </Snackbar>
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const formData = getFormValues(FORM_NAMES.MAIN_FORM)(state);
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
    form: FORM_NAMES.MAIN_FORM, // a unique name for this form
    touchOnChange: true,
    touchOnBlur: true,
    validate,
    onSubmit: (values, dispatch, props) => {
      const {navigation} = props;
      dispatch(raiseAction(Actions.BASIC_PROFILE_COMPONENT_INIT, {navigation}));
    }
  }
)(connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicProfileForm));
