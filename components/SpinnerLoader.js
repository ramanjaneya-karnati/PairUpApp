// @flow
import * as React from "react";
import {Spinner} from 'native-base';
import {View, Image} from 'react-native';
import {API_FETCH_STATUS_IN_PROGRESS} from '../constants';

export default class SpinnerLoader extends React.Component{

  render(){
    const {submitStatus} = this.props;
    return(
      <View>
        { submitStatus === API_FETCH_STATUS_IN_PROGRESS && (<Image
          source={require('../assets/images/Data-Loader.gif')}
        />)}
      </View>
    )
  }

}
