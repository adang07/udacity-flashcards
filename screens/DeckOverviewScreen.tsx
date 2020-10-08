import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { getDeck } from '../utils/api'

interface Props {
    navigation: any,
    route: any
}
class DeckOverview extends React.Component<Props>{
    state = {
        deck: {},
        numberOfCards: this.props.route.params.numberOfCards
    }
    componentDidMount() {
        const getCurrentDeck = async () => {
        const response = await getDeck(this.props.route.params.title)
        console.log(response, "response")
           this.setState({
                deck: response,
                numberOfCards: response.questions.length
            })
        }
        this.props.navigation.addListener('focus', () => {
            getCurrentDeck()
        })
    }
    render() {
        const { deck } = this.state
        const AddCardButton = ({ btnText, deckTitle }) => {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('AddCard', { deckTitle })}
                >
                    <Text style={styles.buttonText}>{btnText}</Text>
                </TouchableOpacity>
            )
        }

        const StartQuizButton = ({ btnText}) => {
            const deckID = this.props.route.params.title
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Quiz', {
                        deck,
                        deckID
                    })}
                >
                    <Text style={styles.buttonText}>{btnText}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.route.params.title}
                </Text>
                <Text style={styles.subtitle}>
                    {this.state.numberOfCards + (this.state.numberOfCards !== 1 ? " cards" : " card")}
                </Text>
                <View style={styles.buttonGroup}>
                    <AddCardButton btnText='Add A Card' deckTitle={this.props.route.params.title} />
                    <StartQuizButton btnText='Start Quiz'/>
                </View>
            </View>
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
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
        color: 'white'
    },
    buttonGroup: {
        marginTop: 100,
    }
})

export default DeckOverview