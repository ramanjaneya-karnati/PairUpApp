import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import {Header, Text, Content, Container, Button, NavigationBar, BaseCard, Image, Slider} from '../../../components'
import Colors from '../../../constants/Colors';
import styles from './pair-center-detail-styles';
import {Icon} from "react-native-elements";
import {change} from "redux-form";
import {FORM_NAMES} from "../../../constants";
import {PAIR_CENTERS_FORM_KEYS, VIEWS, USER_LOCALE_INTERSTS_FORM_KEYS} from "../constants";
import {Actions, raiseAction} from "../actions";
import {BackHandler} from 'react-native';

export default class PairCenterDetails extends React.Component {

  static defaultProps = {
    height: 80,
  };

  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
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

  goBack() {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.PAIR_CENTERS_SCREEN));
  }

  setModalVisible(id) {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.SELECTED_USER_ID}`, id));
    dispatch(raiseAction(Actions.GET_USER_DETAILS));
  }

  addLocale(id) {
    const {dispatch} = this.props;
    dispatch(change(FORM_NAMES.PAIR_CENTERS_FORM, `${PAIR_CENTERS_FORM_KEYS.ADD_LOCALE_TO_USER_INTERESTS}`, id));
    dispatch(raiseAction(Actions.ADD_USER_TO_LOCALE_INTERST));
  }

  render() {

    const {
      pairCenterSelectedData,

      icon = {
        name: "ios-arrow-back",
        type: "ionicon",
        size: 30,
        color: 'white',
      }, dispatch,
      height,
      interestedUsers,
      labelData = {
        id: pairCenterSelectedData.id,
        status: pairCenterSelectedData.isUserInterested
      },
      picture = {
        preview: pairCenterSelectedData.url
      },
      fetchStatus
    } = this.props;
    const Button = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
    return (
      <Container>
        <Header title={pairCenterSelectedData.title} picture={picture}>
          <NavigationBar type="transparent" back="Back" {...{icon, dispatch}}/>
        </Header>
        <Content style={styles.content}>
          <View style={styles.buttons}>

            <Button onPress={this.addLocale.bind(this, labelData)}>
              <View style={styles.button}>
                <Text
                  style={styles.spaceAlign}>{pairCenterSelectedData.isUserInterested ? "I'M INTERESTED" : "INTERESTED"}</Text>
                <Icon
                  color={Colors.white}
                  type={pairCenterSelectedData.isUserInterested ? "ionicon" : "octicon"}
                  size={22}
                  style={styles.icon}
                  name={pairCenterSelectedData.isUserInterested ? "md-checkmark" : "plus"}
                />
              </View>
            </Button>
          </View>

          {interestedUsers && interestedUsers.length > 0 && (
            <View>
              <View style={styles.interestedHeadline}>
                <View>
                  <Text type="headline">Who interested already </Text>
                  <Text type="footnote">{interestedUsers.length} people</Text>
                </View>
              </View>
              <View style={styles.InterestedThumbs}>
                <ScrollView horizontal={true}>
                  {
                    interestedUsers.map((thumbnail, index) => {
                      const picture = {
                        preview: thumbnail.url
                      };
                      return (
                        <TouchableOpacity key={index} onPress={() => {
                          this.setModalVisible(thumbnail.userId);
                        }}>
                          <Image style={[styles.userImages, {height}]} {...picture}/>
                        </TouchableOpacity>)
                    })
                  }
                </ScrollView>
              </View>
            </View>)
          }
          <BaseCard style={styles.addressContainer}>
            <Image {...picture} style={styles.localeThumbnail}/>
            <View style={styles.addressContainerRight}>
              <View style={styles.addressLabelContainer}>
                <View style={styles.addressLabelRight}>
                  <Text type="title4">Address</Text>
                </View>
                <View style={styles.addressMapPointer}>
                  <Icon name="map-marker"
                        type="font-awesome"
                        size={20}
                        color={Colors.primary}/>
                </View>
              </View>
              <Text type="footnote">{pairCenterSelectedData.address}</Text>
            </View>
          </BaseCard>
        </Content>
      </Container>
    )
  }
}


//TODO https://github.com/testshallpass/react-native-dropdownalert
