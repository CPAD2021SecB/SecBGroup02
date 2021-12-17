import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./components/HomeScreen";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: ""/* add your key here */,
  authDomain: ""/* add your key here */,
  databaseURL: ""/* add your key here */, 
  projectId: ""/* add your key here */, 
  storageBucket:  ""/* add your key here */,
  messagingSenderId: ""/* add your key here */,
  appId: ""/* add your key here */
});

export default function App()  {
  return (
    <View style={styles.container}>
      <HomeScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
