import React from "react";
import {View, TouchableOpacity, BackHandler, Image, WebView, Linking} from "react-native";
import {change} from "redux-form";
import {Header, Text, Content, Container, Avatar} from '../../../components'
import {Ionicons} from '@expo/vector-icons';
import styles from '../styles'
import {Icon} from "react-native-elements";
import {USER_PROFILE_LANDING_FORM_KEYS, VIEWS} from "../constants";
import { FORM_NAMES, ImageUrls, EXTERNAL_APP_LINKS} from "../../../constants";
import {nameFormatter} from '../../../utils';
import moment from 'moment';

const uri = EXTERNAL_APP_LINKS.HELP;
export default class ViewProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({tintColor, focused, horizontal}) => (
      <Ionicons
        name={focused ? 'ios-contact' : 'ios-contact'}
        size={horizontal ? 25 : 31}
        style={{color: tintColor}}
      />
    ),
  };

  homePage = () => {
    const {navigation} = this.props;
    navigation.goBack(null);
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.homePage(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  settingScreen = () => {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.EDIT_SETTINGS_VIEW));
  };

  editProfileScreen = () => {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.EDIT_PREFERENCES_VIEW));
  };

  profileImages = () => {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.UPDATE_IMAGES));
  };
  helpScreen = () => {
    Linking.openURL(uri).catch(err => console.error('An error occurred', err));
  };

  render() {
    const {userData, onPress, submitStatus} = this.props;
    const cover = {
      preview: ImageUrls.EXTERNAL.USERS_LIKED_BG,
      uri: ImageUrls.EXTERNAL.USERS_LIKED_BG
    };
    const userAvatar = {
      uri: userData.images[0].thumbUrl
    };
    const userAvatarPlaceholder = {
      uri: ImageUrls.EXTERNAL.USER_PROFILE_PLACEHOLDER
    };
    const userDisplayName = nameFormatter(userData.firstName);
    let years = moment().diff(userData.dob, 'years');

    return (
      <Container>
        <Header picture={cover} heightRatio={0.9}>
          <TouchableOpacity>
            <View style={styles.closeIcon}></View>
          </TouchableOpacity>
          <View style={styles.container}>
            {
              userAvatar.uri ?
                <Avatar uri={userAvatar.uri} size={140} style={styles.avatar} onPress={this.profileImages}/> :
                <Avatar uri={userAvatarPlaceholder.uri} size={140} style={styles.avatar} onPress={this.profileImages}/>
            }
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>{userDisplayName}, {years}</Text>
            </View>
          </View>
        </Header>
        <Content style={styles.content}>
          <View style={styles.profileBodyLinks}>
            <View style={styles.linkLabel}>
              <TouchableOpacity onPress={this.settingScreen} hitSlop={{top: 20, bottom: 20, left: 50, right: 250}}>
                <Text style={styles.label}>Filters</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.linkIcon}>
              <TouchableOpacity onPress={this.settingScreen}>
                <Icon name="settings" type="octicon" size={30} color="#CACACA"/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator}/>
          <View style={styles.profileBodyLinks}>
            <View style={styles.linkLabel}>
              <TouchableOpacity onPress={this.editProfileScreen} hitSlop={{top: 20, bottom: 20, left: 50, right: 250}}>
                <Text style={styles.label}>Settings</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.linkIcon}>
              <TouchableOpacity onPress={this.editProfileScreen}>
                <Icon name="gear" type="evilicon" size={30} color="#CACACA"/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator}/>
          <View style={styles.profileBodyLinks}>
            <View style={styles.linkLabel}>
              <TouchableOpacity onPress={this.helpScreen} hitSlop={{top: 20, bottom: 20, left: 50, right: 250}}>
                <Text style={styles.label}>Help</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.linkIcon}>
              <TouchableOpacity onPress={this.helpScreen} hitSlop={{top: 20, bottom: 20, left: 50, right: 250}}>
                <Icon name="ios-help-circle-outline" type="ionicon" size={30} color="#CACACA"/>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    )

  }
}
