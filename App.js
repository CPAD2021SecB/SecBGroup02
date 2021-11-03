import React from 'react';
import { StyleSheet } from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey:"", //process.env.REACT_APP_apiKey,
  authDomain: "", // process.env.REACT_APP_authDomain,
  databaseURL: "", // process.env.REACT_APP_databaseURL,
  projectId: "", // process.env.REACT_APP_projectId,
  storageBucket: "", // process.env.REACT_APP_storageBucket,
  messagingSenderId:"", // process.env.REACT_APP_messagingSenderId,
  appId: ""// process.env.REACT_APP_appId,
});


const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App()  {
  return (
    <AppNavigator/>
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
