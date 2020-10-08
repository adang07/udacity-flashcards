import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DeckList from '../screens/DeckListScreen';
import AddDeck from '../screens/AddDeckScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { AntDesign } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Decks"
      tabBarOptions={{ activeTintColor: '#fff' }}>
      <BottomTab.Screen
        name="Decks"
        component={TabOneNavigator}
        options={{
          tabBarIcon: () => <AntDesign name="bars" size={24} color="white" />,
        }}
      />
      <BottomTab.Screen
        name="AddDeck"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: () => <AntDesign name="pluscircleo" size={24} color="white" />,
        }}
      />
    </BottomTab.Navigator>
  );
}
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="DeckList"
        component={DeckList}
        options={{ headerTitle: 'Decks' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="AddDeck"
        component={AddDeck}
        options={{ headerTitle: 'Add Deck' }}
      />
    </TabTwoStack.Navigator>
  );
}
