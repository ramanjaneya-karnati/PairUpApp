import * as React from "react";
import {View, Text, Modal} from "react-native";
import Container from "../../../components/Container";
import Content from "../../../components/Content";
import {UserProfileViewScreen} from '../../../components';
import {change} from "redux-form";
import {FORM_NAMES} from "../../../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from "../constants";
export default class SingleUserLikedProfile extends React.Component {

  goBack = ()=> {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.USERS_LIKED_SCREEN));
  };

  render() {
    const {modalOpen} = this.props;
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
