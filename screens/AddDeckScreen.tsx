import * as React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { addDeck } from '../utils/api'

interface Props {
  navigation: any
}

interface State {
  deckTitle: any
}

class AddDeck extends React.Component<Props,State> {
  constructor(props) {
    super(props)
    this.state = {
      deckTitle: ''
    }
  }

  handleSubmit = (deckTitle) => {
    addDeck(deckTitle)
    this.props.navigation.navigate('DeckOverview', {
      title: deckTitle,
      numberOfCards: 0
    })
  }

  render() {
    const { deckTitle } = this.state
    return (
      <KeyboardAvoidingView
      behavior={"padding"}
      style={styles.container}
  >
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          What is the title of your new deck?
        </Text>
        <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ deckTitle: text })}
                    value={deckTitle}
                    editable={true}
                >
                </TextInput>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleSubmit(deckTitle)}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    height: 80,
    backgroundColor: 'rgb(230, 230, 230)',
    alignSelf: 'stretch'
},
buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  position: 'absolute',
  marginBottom: 36,
  bottom: 35
},
button: {
  height:85,
  width:150,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 20,
  marginRight: 10,
  padding: 20,
  borderRadius: 10,
  backgroundColor: 'rgb(10, 125, 240)'
},
  subtitle: {
    marginTop: 5,
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  }
});

export default AddDeck