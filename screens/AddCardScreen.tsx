import React from 'react'
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { addCard } from "../utils/api";

interface Props {
    navigation: any,
    route: any
}

interface State {
    question: any,
    answer: any
}
class AddCard extends React.Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: ''
        }
    }

    handleSubmit = (question, answer) => {
        const deckID = this.props.route.params.deckTitle
        const card = {
            question: question,
            answer : answer
        }

        const addNewCardToDeck = async () => {
           await addCard(deckID, card)
        }
        addNewCardToDeck()
        this.props.navigation.goBack();
    }
    render() {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView
                behavior={"padding"}
                style={styles.container}
            >
            <View style={styles.container}>
                <Text style={styles.title} >
                    Add A Card
                </Text>
                <Text style={styles.subtitle}>
                    Question:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ question: text })}
                    value={question}
                    editable={true}
                >
                </TextInput>
                <Text style={styles.subtitle}>
                    Answer:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ answer: text })}
                    value={answer}
                    editable={true}
                >
                </TextInput>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleSubmit(question, answer)}
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
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        marginTop: 5,
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
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
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
        color: 'white'
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
    buttonGroup: {
        marginTop: 100,
    }
})

export default AddCard