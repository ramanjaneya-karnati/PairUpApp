import * as React from "react";
import {Actions, raiseAction} from "../actions";
import {getFormValues, reduxForm} from "redux-form";
import {API_FETCH_STATUS_IN_PROGRESS, FORM_NAMES} from "../../../constants";
import {VIEWS} from '../constants';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import {IntlTextEnglish} from '../../../constants'
import MessageView from './messages-view';
import {View} from "react-native";

class MessageScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Messages',
    tabBarIcon: ({tintColor, focused, horizontal}) => (
      <Ionicons
        name={focused ? 'ios-chatboxes' : 'ios-chatboxes'}
        size={horizontal ? 25 : 31}
        style={{color: tintColor}}
      />
    ),
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.raiseAction(Actions.MESSAGES_COMPONENT_INIT);
  }

  render() {
    const {
      currentView,
      dispatch,
      handleSubmit,
      submitStatus,
      fetchStatus
    } = this.props;

    /*   if (fetchStatus === API_FETCH_STATUS_IN_PROGRESS || submitStatus === API_FETCH_STATUS_IN_PROGRESS) {
         return (
           <View style={styles.loaderContainer}>
             <Image style={{width: 250, height: 250}} source={require('../../../assets/images/Data-Loader.gif')}/>
           </View>
         )
       }*/
    /* if (!pairCentersData) {
       return <View/>
     }*/
    switch (currentView) {
      case VIEWS.MESSAGES_VIEW:
        //const title = IntlTextEnglish.APPLICATION.PAIR_CENTERS_LANDING_SCREEN_TITLE;
        const messageViewProps = {
          dispatch,
          submitStatus,
        };
        return <MessageView {...messageViewProps}/>;
      default:
        return <View/>
    }
  }
}

function mapStateToProps(state, ownProps) {
  const formData = getFormValues(FORM_NAMES.MESSAGES_MAIN_FORM)(state);
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
  form: FORM_NAMES.MESSAGES_MAIN_FORM, // a unique name for this form
  touchOnChange: true,
  touchOnBlur: true,
  validate: function (values, dispatch) {
  },
  onSubmit: (values, dispatch) => {

    /*if (values.currentView === VIEWS.PAIR_CENTER_DETAIL_SCREEN) {
      dispatch(raiseAction(Actions.USER_PROFILE_UPDATE_SUBMIT))
    }
    if (values.currentView === VIEWS.EDIT_PREFERENCES_VIEW) {
      dispatch(raiseAction(Actions.USER_PREFERENCES_SUBMIT))
    }*/
  }
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageScreen));
