import React, {Component} from 'react'
import Swiper from 'react-native-deck-swiper'
import {Button, StyleSheet, View, Dimensions, Animated, ImageBackground} from 'react-native'
import Octicons from "@expo/vector-icons/Octicons";
import {StyleGuide, Image, Text} from '../../../components';
import {LinearGradient} from "expo";
import {Icon} from "react-native-elements";
import {Colors, FORM_NAMES} from "../../../constants";
import {Actions} from "../actions";
import {USER_CARDS_FORM_KEYS, VIEWS} from '../constants';
import {raiseAction} from "../../PairCenters/actions";
import {change} from "redux-form";

export default class UserSwipeCards extends Component {

  static navigationOptions = {
    tabBarLabel: 'Swipe',
    tabBarIcon: ({tintColor, focused, horizontal}) => (
      <Octicons
        name={focused ? 'flame' : 'flame'}
        size={horizontal ? 25 : 31}
        style={{color: tintColor}}
      />
    ),
  };
  renderCard = (card, index) => {
    const picture = {
      uri: card.image,
      preview: card.image
    };
    return (
      <View style={styles.card}>
        <Image style={[styles.cardImage, {height}]} {...picture}/>
        <View style={styles.content}>
          <View style={styles.alignBottom}>
            <LinearGradient colors={bottomGradient} style={styles.gradient}>
              <View style={styles.cardActionContainer}>
                <View style={styles.userInfo}>
                  <Text type="cardTitle" color="white">{card.name}, {card.age}</Text>
                </View>
                <View style={styles.userActionInfo}>
                  <Icon
                    name="info-outline"
                    type="material"
                    size={30}
                    color="white"/>
                </View>
              </View>

            </LinearGradient>
          </View>
        </View>
      </View>
    )
  };
  onSwiped = (type, index) => {
    console.log(`on swiped ${type}`);
  };
  showNoCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };
  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false)
        })
      })
    }
  };
  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    )
  };
  swipeLeft = () => {
    this.swiper.swipeLeft()
  };
  swipeRight = () => {
    this.swiper.swipeRight()
  };
  swipeTop = () => {
    this.swiper.swipeTop()
  };
  swipeBottom = () => {
    this.swiper.swipeBottom()
  };
  swipeBack = () => {
    this.swiper.swipeBack()
  };
  viewUserProfile = index => {
    const {dispatch} = this.props;
    //dispatch(raiseAction(Actions.SELECTED_USER_PROFILE));
    //console.log("Current User", this.state.cards[index]);
    dispatch(change(FORM_NAMES.USER_CARDS_FORM, `${USER_CARDS_FORM_KEYS.SELECTED_USER_DATA}`, this.state.cards[index]));
    dispatch(change(FORM_NAMES.USER_CARDS_FORM, `${USER_CARDS_FORM_KEYS.CURRENT_VIEW}`, VIEWS.SELECTED_USER_VIEW));


  };
  userLeft = index => {
    console.log("Nope", this.state.cards[index]);
  };
  userRight = index => {
    console.log("Like", this.state.cards[index])

  };

  constructor(props) {

    super(props);
    this.state = {
      cards: [
        {
          name: 'Carolina',
          age: '26',
          image: "https://ae01.alicdn.com/kf/HTB17M3OXH3XS1JjSZFFq6AvupXaV/New-Women-High-Elastic-Velvet-Lace-Floral-Body-suit-Lingerie-Lady-Sexy-Club-Open-Crotch-Party.jpg",
          about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          company: "Nisum Technologies",
          userId: "534543543-fsdfsdf-4343243"
        },
        {
          name: 'Alexa',
          age: '29',
          image: 'http://lmrweddings.com/lmr-content/uploads/imp1719b.jpg',
          about: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
          company: "TCS",
          userId: "56456456-fsdfsdf-4343243"
        },
        {
          name: 'Catalina',
          age: '30',
          image: 'https://www.selectfashion.co.uk/templates/selectfashion.co.uk.new/blog/images/blog_111_new-years-eve-outfits/new-years-eve-outfit-one.png',
          about: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000",
          company: "Sura Technologies",
          userId: "534543543-fhskdjhfjd-4343243"
        },
        {
          name: 'Jessy',
          age: '29',
          image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/aa/92/e1/pretty-girls.jpg',
          about: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
          company: "Niveria",
          userId: "534543543-fsdfsdf-47397438"
        },
      ],
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwipedLeft={(index) => this.userLeft(index)}
          onSwipedRight={(index) => this.userRight(index)}
          onSwipedTop={() => this.onSwiped('top')}
          onSwipedBottom={() => this.onSwiped('bottom')}
          onTapCard={this.viewUserProfile}
          cards={this.state.cards}
          verticalSwipe={false}
          backgroundColor={StyleGuide.palette.lightGray}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          marginBottom={60}
          showSecondCard={true}
          jumpToCardIndex={this.state.cardIndex}
          containerStyle={{flex: 1}}
          cardHorizontalMargin={10}
          renderCard={this.renderCard}
          onSwipedAll={this.showNoCards}
          stackSize={2}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              style: {
                label: {
                  borderColor: '#F34109',
                  color: '#F34109',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  borderColor: '#F34109',
                  color: '#F34109',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 90,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  borderColor: '#A237F3',
                  color: '#A237F3',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 90,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  borderColor: '#FD297B',
                  color: '#FD297B',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
          {/*<Button onPress={this.swipeLeft} title='Swipe Left' />*/}
        </Swiper>
        {this.state.swipedAllCards ? <View style={styles.nocardsContainer}>
          <View style={{alignItems: 'center', justifyContent: 'space-around',}}>
            <Text style={styles.noCardsHeadline}>Come back tomorrow</Text>
            <Text>Check back soon to find more people</Text>
          </View>
        </View> : <View style={styles.actionContainer}>
          {/*<Icon
            raised
            name="rotate-left"
            type="font-awesome"
            size={20}
            color="#F34109"
            onPress={this.swipeBack}
          />*/}
          <Icon
            raised
            name="close"
            type="font-awesome"
            size={30}
            color="#F34109"
            onPress={this.swipeLeft}
          />
          <Icon
            raised
            name="heart"
            type="font-awesome"
            size={20}
            color="#A237F3"
            onPress={this.swipeTop}
          />
          <Icon
            raised
            name="star"
            type="font-awesome"
            size={30}
            color="#FD297B"
            onPress={this.swipeRight}
          />
          {/*<Icon
            raised
            name="ios-rocket"
            type="ionicon"
            size={20}
            color="#44B4FD"/>*/}
        </View>
        }
      </View>
    )
  }
}
const {height, width} = Dimensions.get('window');
const cardWidth = width - 10 * 2;
const topGradient = ["rgba(0,0,0,0.8)", "transparent"];
const bottomGradient = ["transparent", "rgba(0,0,0,1.2)"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.lightGray
  },
  emptyCardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: StyleGuide.palette.darkGray,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  },

  cardImage: {
    ...StyleGuide.styles.borderRadius,

  },
  actionContainer: {
    position: 'absolute',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: StyleGuide.spacing.tiny,
    marginBottom: 10,
    left: 0,
    right: 0,
    bottom: 0
  },
  nocardsContainer: {
    position: 'absolute',
    paddingLeft: StyleGuide.spacing.tiny,
    left: 0,
    right: 0,
    bottom: 250,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gradient: {
    padding: StyleGuide.spacing.small,
    paddingBottom: StyleGuide.spacing.tiny,
    ...StyleGuide.styles.borderRadius
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between"
  },
  alignBottom: {
    position: "absolute",
    bottom: 0,
    width: cardWidth
  },
  cardActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    justifyContent: "flex-start"
  },
  noCardsHeadline: {
    fontSize: 25,
    lineHeight: 25,
    color: Colors.primary,
    ...StyleGuide.styles.fonts.headline
  }
});



