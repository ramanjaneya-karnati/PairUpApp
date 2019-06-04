import * as React from "react";
import {View, Text, Modal} from "react-native";
import Container from "../../../components/Container";
import Content from "../../../components/Content";
import {UserProfileViewScreen} from '../../../components';
import {change} from "redux-form";
import {FORM_NAMES} from "../../../constants";
import {USER_CARDS_FORM_KEYS, VIEWS} from "../constants";
export default class SingleUserLikedProfile extends React.Component {

  goBack = ()=> {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.USER_CARDS_FORM, `${USER_CARDS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.USER_CARDS_VIEW));
  };

  render() {
    const {modalOpen, onPress} = this.props;
    return (
      <Container>
        <Content>
          <View>
            <Modal
              animationType="fade"
              transparent={false}
              visible={modalOpen.visible}
              onRequestClose={this.goBack}>
              <UserProfileViewScreen {...this.props}/>
            </Modal>
          </View>
        </Content>
      </Container>
    )
  }
}
