// @flow
import React from 'react';
import {Animated, ImageBackground, View, Text, TouchableOpacity, Platform} from 'react-native';
import {IntlTextEnglish} from '../../../constants';
import styles from '../styles'
import { Constants, Location, Permissions } from 'expo';

export default class GetUserLocation extends React.Component {

  constructor(props) {
    super(props);
    this.getUserLocation= this.getUserLocation.bind(this);
  }

  state = {
    location: null,
    errorMessage: null,
  };

  getUserLocation(){
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  render() {
    let text = null;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={[styles.container]}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={[styles.section, {paddingTop: 10}]}>
            <Animated.Image
              resizeMode="contain"
              style={[styles.logo]}
              source={require('../../../assets/images/Location-Icon.png')}
            />
            <TouchableOpacity onPress={this.getUserLocation}>
            <View style={styles.card}>
              <Text style={styles.logOut}>{IntlTextEnglish.APPLICATION.GET_USER_LOACTION}</Text>
            </View>
            </TouchableOpacity>
            <Text>{text}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }
}



