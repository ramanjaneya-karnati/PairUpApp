import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {bindActionCreators} from "redux";
import {Actions, raiseAction} from "../actions";
import {connect} from "react-redux";
import {getFormValues, reduxForm} from 'redux-form'
import {FORM_NAMES} from "../constants";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      navigation,
      dispatch
    } = this.props;
    dispatch(raiseAction(Actions.COMPONENT_INITIALIZING, {navigation}));
  }

  render() {
    const {
      isAppLoading,
      isUserLoggedIn,
      userData
    } = this.props;

    return (

      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});


function mapStateToProps(state, ownProps) {
  const formData = getFormValues(FORM_NAMES.MAIN_FORM)(state)
  return {
    ...ownProps,
    ...formData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(raiseAction, dispatch)
  };
}

export default reduxForm({
  form: FORM_NAMES.MAIN_FORM,
  touchOnChange: true,
  destroyOnUnmount: false,
  touchOnBlur: true,
  validate: function (values, dispatch, props) {
  }
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen));

