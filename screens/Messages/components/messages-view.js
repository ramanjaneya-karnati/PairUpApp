import * as React from 'react';
import {StickyNavigationBar} from "../../../components";
import {View, Text, ScrollView} from "react-native";
import {Container, Content, Image} from '../../../components'
import styles from '../styles';

export default class MessageView extends React.Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    height: 100,
    handleColor: "black"
  };

  render() {
    const {height, count = 2, handleColor} = this.props;
    const picture = {
      preview: 'https://amp.businessinsider.com/images/5a8d6a18f22fa91a008b46bf-750-562.jpg'
    };
    const picture1 = {
      preview: 'http://d26j9nk90wf3d1.cloudfront.net/wp-content/uploads/science_makeup.jpg'
    };
    return (
      <Container>
        <StickyNavigationBar/>
        <Content>
          {count && count > 0 && (
            <View style={styles.container}>
              <Text style={styles.headLine}>Matches</Text>
              <View style={styles.matchedContainer}>
                <ScrollView horizontal={true}>
                  <Image style={[styles.matchedUserImages, {height}]} {...picture}/>
                  <Image style={[styles.matchedUserImages, {height}]} {...picture1}/>
                </ScrollView>
              </View>
            </View>
          )}
          <View style={styles.container}>
            <Text style={styles.headLine}>Messages</Text>
            <View style={styles.matchedContainer}>
              <View style={styles.user}>
                <Image style={[styles.notificationUserImages]} {...picture}/>
                <View style={styles.username}>
                  <Text style={styles.headline}>Romina</Text>
                  <Text style={styles.subhead}>I just pinged you on whatsapp</Text>
                  <View style={{paddingTop: 18, borderBottomWidth: 0.6, borderColor: '#ececec'}}></View>
                </View>
              </View>
            </View>
            <View style={styles.matchedContainer}>
              <View style={styles.user}>
                <Image style={[styles.notificationUserImages]} {...picture1}/>
                <View style={styles.username}>
                  <Text style={styles.headline}>Walker</Text>
                  <Text style={styles.subhead}>See you in a good party today</Text>
                  <View style={{paddingTop: 18, borderBottomWidth: 0.6, borderColor: '#ececec'}}></View>
                </View>
              </View>
            </View>
            <View style={styles.matchedContainer}>
              <View style={styles.user}>
                <Image style={[styles.notificationUserImages]} {...picture}/>
                <View style={styles.username}>
                  <Text style={styles.headline}>Romina</Text>
                  <Text style={styles.subhead}>I just pinged you on whatsapp</Text>
                  <View style={{paddingTop: 18, borderBottomWidth: 0.6, borderColor: '#ececec'}}></View>
                </View>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
