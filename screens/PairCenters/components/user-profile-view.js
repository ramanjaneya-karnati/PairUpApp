import React from 'react';
import {View, TouchableOpacity, BackHandler, StyleSheet} from 'react-native';
import styles from "./pair-center-detail-styles";
import {Slider, Content, Text} from '../../../components';
import {Icon} from "react-native-elements";
import {change, Field} from "redux-form";
import {API_FETCH_STATUS_IN_PROGRESS, FORM_NAMES} from "../../../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from "../constants";
import {nameFormatter} from '../../../utils';
import Container from "../../../components/Container";
import Dialog, {DialogContent, DialogButton, DialogTitle} from 'react-native-popup-dialog';
import RadioForm from "react-native-simple-radio-button";
import Colors from "../../../constants/Colors";
import {USER_PROFILE_LANDING_FORM_KEYS} from "../../Profile/constants";
import ActionSheet from 'react-native-actionsheet'
import {raiseAction, Actions} from '../actions'

const radio_props = [
  {label: 'Bad Photos', value: 0},
  {label: 'Feels like spam', value: 1},
  {label: 'Inappropriate behaviour', value: 2}
];

const options = [
  <Text style={{color: "#fff"}} value={'cancel'}>CANCEL</Text>,
  <Text style={styles.text} value={'BAD_PHOTOS'}>Bad Photos</Text>,
  <Text style={styles.text} value={'FEELS_LIKE_SPAM'}>Feels like spam</Text>,
  <Text style={styles.text} value={'IN_APPROPRIATE_BEHAVIOUR'}>Inappropriate Behaviour</Text>
];

export default class UserProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checked: false
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
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

  goBack() {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.PAIR_CENTER_DETAIL_SCREEN));
  }

  renderRadio = ({input: {value, onChange}, ...otherProps}) => {
    return <RadioForm
      radio_props={radio_props}
      buttonColor={Colors.primary}
      buttonInnerColor={Colors.primary}
      buttonSize={15}
      initial="-1"
      animation={true}
      onPress={onChange}
    />
  };

  render() {
    const {handleSubmit, dispatch, selectedUserIdData} = this.props;
    return (
      <Container>
        <Slider images={selectedUserIdData.images}/>
        <Content style={styles.content}>
          <View style={styles.interestedHeadline}>
            <View>
              <Text style={styles.textColor}
                    type="title3">{nameFormatter(selectedUserIdData.firstName)}, {selectedUserIdData.age} </Text>
              {selectedUserIdData.company && (
                <Text style={styles.textColor} type="footnote">{selectedUserIdData.company}</Text>)}
            </View>
            <Icon name="ios-heart-empty"
                  type="ionicon"
                  size={40}
                  color="#EE53F7"/>
          </View>
          <View style={styles.interestedHeadline}>
            <View>
              <Text style={styles.textColor}>{selectedUserIdData.about}</Text>
            </View>
          </View>
          <View style={styles.reportContainer}>
            <TouchableOpacity onPress={this.showActionSheet}>
              <Text type="headline"
                    style={styles.reportTextLink}>REPORT {nameFormatter(selectedUserIdData.firstName).toUpperCase()}</Text>
            </TouchableOpacity>
            <ActionSheet
              ref={o => this.ActionSheet = o}
              title="REPORT USER"
              message="Is this person bothering you? Tell us what they did?"
              options={options}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              onPress={(index) => {
                const selected = options[index];
                const value = selected.props.value;
                dispatch(raiseAction(Actions.REPORT_USER_SUBMIT, {
                  user: selectedUserIdData,
                  type: value,
                  from: 'USER_PROFILE'
                }))

              }}
              styles={{
                cancelButtonBox: {
                  padding: 15,
                  marginTop: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ff0059'
                },
                titleBox: {
                  padding: 20,
                  backgroundColor: "#ff0059"
                },
                titleText: {
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "Gotham-Rounded-SemiBold",
                  color: "#fff"
                },
                messageBox: {
                  padding: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff'
                },
                messageText: {
                  color: '#666666',
                  fontSize: 19,
                  textAlign: "center",
                },
                buttonBox: {
                  height: 50,
                  marginTop: StyleSheet.hairlineWidth,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff'
                },
                buttonText: {
                  fontSize: 18,
                  fontFamily: "Gotham-Rounded-SemiBold"
                }
              }}
            />
          </View>

          {/*<View style={styles.actionContainer}>
              <Icon
                raised
                name="close"
                type="font-awesome"
                size={30}
                color="#F34109"/>
              <Icon
                raised
                name="heart"
                type="font-awesome"
                size={25}
                color="#9400D3"/>
              <Icon
                raised
                name="star"
                type="font-awesome"
                size={30}
                color="#44B4FD"/>
            </View>*/}
        </Content>
      </Container>
    )
  }
}
