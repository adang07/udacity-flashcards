import React from 'react'
import {
    Button,
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

interface State {
    questions: any
    questionNumber: any,
    showQuestion: any,
    correctAnswers: any,
    title: any
}

class Quiz extends React.Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            questions: null,
            questionNumber: 1,
            showQuestion: true,
            correctAnswers: 0,
            title: null
        }
    }

    componentDidMount() {
        const deckId = this.props.route.params.deckID
        getDeck(deckId).then((deck) => {
            this.setState({ questions: deck.questions, title: deck.title })
            console.log(this.state.questions.length, this.state.title, 'quiz')
        })
    }

    handleCorrect = () => {
        this.setState(() => ({
            correctAnswers: this.state.correctAnswers + 1,
            questionNumber: this.state.questionNumber + 1,
            showQuestion: true,
        }))
    }

    flipCard = () => {
        this.setState((prevState) => ({
            showQuestion: !prevState.showQuestion
        }))
    }

    handleIncorrect = () => {
        this.setState((prevState) => ({
            questionNumber: this.state.questionNumber + 1,
            showQuestion: true,
        }))
    }

    handleRestart = () => {
        this.setState({
            questionNumber: 1,
            showQuestion: true,
            correctAnswers: 0
        })
    }
    
    render() {
        const { questions, questionNumber, showQuestion, correctAnswers } = this.state
        if (questions === null || questions === undefined) {
            return null;
        }
        else if (questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        There are no questions in this deck
                      </Text>
                </View>
            )
        }
        else if (questions.length !== questionNumber) {
            const question = questions[questionNumber]
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Progress: {questionNumber} of {questions.length}
                    </Text>
                    <Text style={styles.question}>
                        {showQuestion ? question.question : question.answer}
                    </Text>
                    <TouchableOpacity
                        onPress={this.flipCard}
                        style={styles.button}
                    >
                        <Text> {showQuestion ? 'Show Answer' : 'Show Question'}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={this.handleCorrect}
                            style={styles.btnCorrect}
                        >
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handleIncorrect}
                            style={styles.btnIncorrect}
                        >
                            <Text>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else if(questions.length == questionNumber){
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Finished! 
                    </Text>
                    <Text style={styles.subtitle}>
                        Score: You got {correctAnswers}/{questions.length} correct!
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                        style={styles.btnCorrect}
                            onPress={this.handleRestart}>
                            <Text>
                                Restart Quiz
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {this.props.navigation.navigate('DeckList')}}>
                            <Text>
                                Back to Home
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        marginBottom: 36,
        bottom: 35
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
        backgroundColor: '#EBD9FD'
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
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
        color: '#EBD9FD',
        margin: 20,
    },
    btnCorrect: {
        height:85,
        width:150,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#28A745',
    },
    btnIncorrect: {
        height:85,
        width:150,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#DC3545',
    },
})


export default Quiz