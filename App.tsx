import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { setNotification } from './utils/api'

export default function App() {
    setNotification()
    return (
      <SafeAreaProvider>
        <Navigation/>
        <StatusBar />
      </SafeAreaProvider>
    );
}
