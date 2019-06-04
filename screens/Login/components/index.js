// @flow
import React, {Component} from 'react';
import {Dimensions, ImageBackground, Animated, StyleSheet, View} from 'react-native';
import {KEYS} from '../../../config/utils';
import {Button} from '../../../components';
import {IntlTextEnglish} from '../../../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {Actions, raiseAction} from "../actions";
import styles from '../styles'
class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.faceBookLogin = this.faceBookLogin.bind(this);
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.raiseAction(Actions.LOGIN_COMPONENT_INIT);
  }

  async faceBookLogin() {
    try {
      const {actions, navigation: {navigate}} = this.props;
      const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
        KEYS.FBAPPID,
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,gender,id,name,picture.type(large)`
        );
        const {picture, name, email, id} = await response.json();
        const data = {
          firstName: name,
          lastName: email,
          facebookId: id
        };
        actions.raiseAction(Actions.SUBMIT_LOGIN, {data, navigate});
      } else if (type === "cancel") {
        actions.raiseAction(Actions.SUBMIT_LOGIN_FAILURE, { navigate });
      }
      else {
      }
    } catch (e) {
      console.log("Login Error", e);
      throw e;
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ImageBackground
          source={require('../../../assets/images/background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={[styles.section, {paddingTop: 30}]}>
            <Animated.Image
              resizeMode="contain"
              style={[styles.logo]}
              source={require('../../../assets/images/Logo.png')}
            />
            <Button
              primary
              onPress={this.faceBookLogin}
              label={IntlTextEnglish.APPLICATION.FB_LOGIN_TEXT}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...state,
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    actions: bindActionCreators({raiseAction}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)


