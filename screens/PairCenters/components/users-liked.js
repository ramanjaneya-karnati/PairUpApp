import React from 'react';
import {View, Modal, TouchableHighlight, Alert, TouchableOpacity} from 'react-native';
import styles from "./users-liked-styles";
import {Content, Text, Header} from '../../../components';
import {Icon} from "react-native-elements";
import Container from "../../../components/Container";
import {change} from "redux-form";
import {FORM_NAMES} from "../../../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS} from "../constants";
import GridView from 'react-native-super-grid';
import Image from "../../../components/Image";
import {LinearGradient} from "expo";
import {Actions, raiseAction} from "../actions";
import {ImageUrls} from '../../../constants';
export default class UserProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      visible: true
    }
  }

  goBack() {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.PAIR_CENTERS_SCREEN));
  }

  openSingleLikedUser = () => {
    const {dispatch} = this.props;
    dispatch(raiseAction(Actions.SINGLE_USER_LIKED_PROFILE_VIEW));
  };
  static defaultProps = {
    height: 200
  };

  render() {
    const {handleSubmit, dispatch, selectedUserIdData, modalOpen, height, users} = this.props;
    const cover = {
      preview: ImageUrls.EXTERNAL.USERS_LIKED_BG,
      uri: ImageUrls.EXTERNAL.USERS_LIKED_BG
    };
    return (
      <Container>
        <Content>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalOpen.visible}
              onRequestClose={this.goBack}>
              <Header picture={cover} heightRatio={0.7}>
                <TouchableOpacity onPress={this.goBack} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                  <View style={styles.closeIcon}>
                    <Icon name="ios-close-circle-outline" type="ionicon" size={40} color="#fff"/>
                  </View>
                </TouchableOpacity>
                <View style={styles.itemSummaryContainer}>
                  <Text style={styles.itemSummaryHeadline}>{users.length} new people liked you!</Text>
                  <Text style={styles.itemSummarySubHead}>Start swiping more to get you liked</Text>
                </View>
              </Header>
              <GridView
                itemDimension={130}
                items={users}
                style={styles.gridView}
                renderItem={user => (
                  users && users.length > 0 &&
                  <TouchableOpacity onPress={this.openSingleLikedUser}>
                    <View style={{height: 200}}>
                      <Image style={[styles.itemContainer, {height}]} {...user.picture}/>
                      <View style={{position: "absolute", bottom: 0,}}>
                        <LinearGradient colors={bottomGradient} style={styles.gradient}>
                          <Text style={styles.itemName}>{user.name}, {user.age}</Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </Modal>
          </View>
        </Content>
      </Container>
    )
  }
}
const bottomGradient = ["transparent", "rgba(0,0,0,0.8)"];
