import React from 'react'
import { getDecks } from '../utils/api'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

interface Props {
  navigation: any
}

class DeckList extends React.Component<Props> {
  constructor(props) {
    super(props)
  }
  state = {
    decks: {}
  }
  componentDidMount() {
    const getCurrentDecks = async () => {getDecks().then((decks: any) => this.setState({ decks: decks }))}
    this.props.navigation.addListener('focus', () => {
      getCurrentDecks()
  })
  }

  deckButton = ({ deck }) => {
    let numberOfCards = deck.questions.length
    return (
      <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DeckOverview', {
                    title: deck.title,
                    numberOfCards: numberOfCards,
                })}
                key={deck.title}
            >
                <View style={styles.button}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.subtitle}>
                            {numberOfCards + (numberOfCards !== 1 ? " cards" : " card")}
                        </Text>
                </View>
            </TouchableOpacity>
    )
  }

  render() {
    const allDecks = [] as any;
    if (this.state.decks) {
      Object.keys(this.state.decks).forEach((key, _index) => {
        allDecks.push(this.deckButton({deck: this.state.decks[key]}));
      });
  }
    return (
      <View style={styles.getStartedContainer} >
        <Text style={styles.getStartedText}>Mobile Flashcards</Text>
        {allDecks}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    height:85,
    width:200,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(10, 125, 240)'
  },
title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
},
subtitle: {
    color: 'white'
},
});

export default DeckList