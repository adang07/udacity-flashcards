import AsyncStorage from '@react-native-community/async-storage'
import { Decks } from './_DATA'
import {Notifications } from 'expo';
import * as Permissions from 'expo-permissions'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:deck';
export const NOTIFICATIONS_KEY = 'Notifications:deck'

export async function storeData() {
    try {
        await AsyncStorage.setItem(
            DECKS_STORAGE_KEY,
            JSON.stringify(Decks)
        )

    } catch (error) {
        console.log(error)
    }
}

export async function getDecks(){
    try{
        const item = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
      
        if (item === null){
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(Decks))
        }
        console.log('inside getDecks,  results = ', item)
        return item === null ? Decks : await JSON.parse(item)
    }
    catch (error){
        console.log(error)
    }
}

export async function getDeck(id){
    try{
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        return JSON.parse(decks)[id]
    }
    catch(err){
        console.log(err)
    }
}

export async function addCard(title, card){
    try{
        const deck = await getDeck(title)
        const updatedQuestions = [...deck.questions, card];
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: updatedQuestions
                }
            })
        )

        const updatedDecks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        console.log('inside addCard,  results = ', updatedDecks)
    }
    catch(err) {
        console.log(err)
    }
}

export async function addDeck(title){
    try{
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            })
        )
    }
    catch(err){
        console.log(err)
    }
}

export function clearNotification(){
    return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setNotification(){
    AsyncStorage.getItem(NOTIFICATIONS_KEY)
        .then(JSON.parse)
        .then(data => {
            if(data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status}) => {
                    if (status === 'granted'){
                        Notifications.cancelAllScheduledNotificationsAsync()

                        Notifications.scheduleLocalNotificationAsync({
                            notificationData: {
                                title: "You haven't done a quiz today!",
                                body: "Continue your progress by completing a quiz"
                            },
                            trigger : {
                                time: tomorrow,
                                repeat: "day"
                            }
                        })

                        AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}