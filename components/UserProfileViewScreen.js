// @flow
import * as React from "react";
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from "react-native";
import {Container, Content, Slider} from "../components";

import Colors from '../constants/Colors';
import {nameFormatter} from "../utils";
import {Icon} from "react-native-elements";
import ActionSheet from "react-native-actionsheet";
import {Actions, raiseAction} from "../screens/PairCenters/actions";
import {withTheme, StyleGuide} from "./theme";


const options = [
  <Text style={{color: "#fff", fontFamily: "Gotham-Rounded-SemiBold", fontSize: 20,}} value='cancel'>CANCEL</Text>,
  <Text style={{
    fontFamily: "Gotham-Rounded-Normal",
    padding: StyleGuide.spacing.tiny,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 17
  }} value={'BAD_PHOTOS'}>Bad
    Photos</Text>,
  <Text style={{
    fontFamily: "Gotham-Rounded-Normal",
    padding: StyleGuide.spacing.tiny,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 17
  }} value={'FEELS_LIKE_SPAM'}>Feels
    like spam</Text>,
  <Text style={{
    fontFamily: "Gotham-Rounded-Normal",
    padding: StyleGuide.spacing.tiny,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 17
  }}
        value={'IN_APPROPRIATE_BEHAVIOUR'}>Inappropriate Behaviour</Text>
];

type UserProfileViewScreenProps = {
  age: number,
  firstName?: string,
  about?: string,
  company?: string,
};
const images = [
  {url: 'http://www.starscruisingnightclub.com.au/uploads/lge/1285003010.jpg',},
  {url: 'https://farm8.staticflickr.com/7338/12183726876_e8fa7da976_b.jpg',}
];
export default class UserProfileViewScreen extends React.Component<UserProfileViewScreenProps> {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    actionContainer: true
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {firstName, images, age, company, about, dispatch, lookingFor, smoking, currentLocation, actionContainer, onPress} = this.props;
    return (
      <Container>
        <Content style={styles.content}>
          {images && images.length > 0 && <Slider images={images}/>}

          <View style={styles.headlineBlock}>
            <View>
              <Text style={styles.textColor}>{firstName}, {age} </Text>
              {company && (<View style={styles.companyContainer}><Icon name="briefcase"
                                                                       type="font-awesome"
                                                                       size={15}
                                                                       color="#999999"
              /><Text style={styles.companyText} type="footnote">{company}</Text></View>)}
            </View>
          </View>
          {about && (
            <View style={styles.headlineBlock}>
              <Text style={styles.aboutTextColor}>{about}</Text>
            </View>)
          }
          {lookingFor && (
            <View style={styles.headlineBlockContainer}>
              <View style={styles.leftAlign}>
                <Text style={styles.subHeadLine}>INTERESTED IN</Text>
                <Text style={styles.aboutTextColor}>A Man 29 - 35 Years</Text>
              </View>
              <View style={styles.rightAlign}>
                <Icon name="binoculars"
                      type="font-awesome"
                      size={20}
                      color="#999999"
                />
              </View>
            </View>)
          }
          {smoking && (
            <View style={styles.headlineBlockContainer}>
              <View style={styles.leftAlign}>
                <Text style={styles.subHeadLine}>SMOKE</Text>
                <Text style={styles.aboutTextColor}>Yes</Text>
              </View>
              <View style={styles.rightAlign}>
                <Icon name="smoke-free"
                      type="material"
                      size={20}
                      color="#999999"/>
              </View>
            </View>)
          }
          {currentLocation && (
            <View style={styles.headlineBlockContainer}>
              <View style={styles.leftAlign}>
                <Text style={styles.subHeadLine}>Location</Text>
                <Text style={styles.aboutTextColor}>Santiago, Metro</Text>
              </View>
              <View style={styles.rightAlign}>
                <Icon name="md-locate"
                      type="ionicon"
                      size={20}
                      color="#999999"/>
              </View>
            </View>)
          }
          <View style={styles.reportBlock}>
            <TouchableOpacity onPress={this.showActionSheet}>
              <Text type="headline"
                    style={styles.reportTextLink}>REPORT {firstName ? nameFormatter(firstName).toUpperCase() : 'USER'}</Text>
            </TouchableOpacity>
            <ActionSheet
              ref={o => this.ActionSheet = o}
              title="REPORT USER"
              message="Is this person bothering you? Tell us what they did?"
              options={options}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              onPress={(index) => {
                const selected = options[index];
                const value = selected.props.value;
                dispatch(raiseAction(Actions.REPORT_USER_SUBMIT, {
                  user: firstName,
                  type: value,
                  from: 'USER_PROFILE'
                }))

              }}
              styles={{
                cancelButtonBox: {
                  padding: 15,
                  marginTop: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ff0059'
                },
                titleBox: {
                  padding: 20,
                  backgroundColor: "#ff0059"
                },
                titleText: {
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "Gotham-Rounded-SemiBold",
                  color: "#fff"
                },
                messageBox: {
                  padding: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff'
                },
                messageText: {
                  color: '#666666',
                  fontSize: 19,
                  textAlign: "center",
                  fontFamily: "Gotham-Rounded-Normal"
                },
                buttonBox: {
                  height: 50,
                  marginTop: StyleSheet.hairlineWidth,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff'
                },
                buttonText: {
                  fontSize: 18,
                  fontFamily: "Gotham-Rounded-SemiBold"
                },

              }}
            />
          </View>
        </Content>
        {actionContainer && (
          <View style={styles.actionContainer}>
            <Icon
              raised
              name="close"
              type="font-awesome"
              size={30}
              color="#F34109"
              onPress={onPress}
            />
            <Icon
              raised
              name="heart"
              type="font-awesome"
              size={25}
              color="#9400D3"
              onPress={onPress}
            />
            <Icon
              raised
              name="star"
              type="font-awesome"
              size={30}
              color="#44B4FD"
              onPress={onPress}
            />
          </View>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary
  },
  content: {
    backgroundColor: StyleGuide.palette.lightGray,
  },
  headlineBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginBottom: 1
  },
  aboutTextColor: {
    color: "#999999",
    fontSize: 16,
    lineHeight: 25,
    fontFamily: "Gotham-Rounded-Normal"
  },
  subHeadLine: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: "Gotham-Rounded-Normal"
  },
  reportBlock: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginBottom: 1
  },
  text: {
    padding: StyleGuide.spacing.tiny,
    paddingTop: 15,
    paddingBottom: 10,
  },
  reportTextLink: {
    color: StyleGuide.palette.darkGray,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    fontFamily: "Gotham-Rounded-SemiBold"
  },
  subhead: {
    color: StyleGuide.palette.darkGray
  },
  textColor: {
    fontSize: 25,
    lineHeight: 26,
    fontFamily: "Gotham-Rounded-SemiBold"
  },
  companyText: {
    paddingLeft: StyleGuide.spacing.tiny,
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "Gotham-Rounded-Normal",
    color: "#999999"
  },
  headlineBlockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginBottom: 1
  },
  leftAlign: {
    justifyContent: 'flex-start',
  },
  rightAlign: {
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  companyContainer: {
    flexDirection: "row",
    paddingTop: StyleGuide.spacing.tiny
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.white,
    padding: StyleGuide.spacing.small,
    marginBottom: 2,
  }
});
//TODO Remove defaultProps once connected to middleware data
