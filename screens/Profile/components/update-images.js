import {Component} from "react";
import {Actions, raiseAction} from "../actions";
import {ActivityIndicator, BackHandler, StyleSheet, TouchableOpacity, View} from "react-native";
import Image from "../../../components/Image";
import styles from "./update-images-styles";
import {Header, Icon} from "react-native-elements";
import Colors from "../../../constants/Colors";
import Container from "../../../components/Container";
import Content from "../../../components/Content";
import GridList from "react-native-grid-list";
import {
  API_FETCH_STATUS_FAILURE,
  API_FETCH_STATUS_IN_PROGRESS,
  API_FETCH_STATUS_SUCCESS,
  FORM_NAMES
} from "../../../constants";
import {ImagePicker, Permissions} from "expo";
import React from "react";
import {change} from "redux-form";
import {USER_PROFILE_LANDING_FORM_KEYS, VIEWS} from "../constants";
import  {StyleGuide} from "../../../components";
import {Snackbar} from "react-native-paper";
import Text from "react-native";

export default class UserProfileImages extends Component {

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this._maybeRenderUploadingOverlay = this._maybeRenderUploadingOverlay.bind(this);
    this._pickImage = this._pickImage.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  static defaultProps = {
    height: 150
  };

  goBack() {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  renderItem({item, index}) {
    const {
      dispatch,
      height,
      picture = {
        //uri: item.url,
        preview: item.url
      },
      updateImagesAlert

    } = this.props;
    return (

      <View>
        <TouchableOpacity onPress={() => {
          this._pickImage(index)
        }}>
          <Image style={[styles.userImages, {height}]} {...picture}/>

        </TouchableOpacity>

        <View style={styles.rightBlock}>
          {
            !item.id &&
            <Icon
              name='plus'
              type='evilicon'
              color={Colors.white}
              size={30}
              onPress={() => this._pickImage(index)}
              underlayColor={Colors.primary}
            />
          }

          {
            item.id &&
            <Icon
              name='minus'
              type='evilicon'
              color={Colors.white}
              size={30}
              onPress={function () {
                dispatch(raiseAction(Actions.USER_PROFILE_IMAGE_DELETE, {...item}));
              }}
              underlayColor={Colors.primary}
              style={{top: '10px'}}
            />
          }

        </View>
      </View>
    )
  }

  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate("Settings");
  };

  render() {
    const {
      userData: {
        images
      },
      submitStatus,
      dispatch

    } = this.props;
    return (
      <Container>
        <Header
          placement="left"
          backgroundColor={Colors.primary}
          leftComponent={{
            icon: 'arrow-back', color: '#fff', onPress: function () {
              dispatch(change(FORM_NAMES.USER_PROFILE_LANDING_FORM, `${USER_PROFILE_LANDING_FORM_KEYS.CURRENT_VIEW}`, VIEWS.VIEW_PROFILE));
            }
          }}
          outerContainerStyles={{height: 80}}
          centerComponent={{
            text: 'Upload Images',
            style: {color: '#fff', fontSize: 17, lineHeight: 22, ...StyleGuide.styles.fonts.headline}
          }}
        />
        <View style={styles.container}>
          <Content style={styles.content}>
            <GridList
              showSeparator
              data={images}
              numColumns={2}
              renderItem={this.renderItem}
              itemStyle={styles.wrapperSpacing}
            />
            {this._maybeRenderUploadingOverlay()}
          </Content>
        </View>
      </Container>

    );
  }

  _maybeRenderUploadingOverlay() {
    const {
      submitStatus
    } = this.props;
    if (submitStatus === API_FETCH_STATUS_IN_PROGRESS) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large"/>
        </View>
      );
    }
  };

  _pickImage = async (index) => {
    const {actions, dispatch} = this.props;
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 0.7
        //aspect: [4, 3],
      });
      dispatch(raiseAction(Actions.USER_PROFILE_IMAGE_UPLOAD, {uri: pickerResult.uri, index}));
    }
  };
}
