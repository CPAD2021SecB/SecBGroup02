import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

import firebase from "firebase/compat";


class LoaderScreen extends Component {

    componentDidMount() {
        this.checkIfLoggedIn()
    }
    
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigattion.navigate("Dashboard")
            } else {
                this.props.navigation.navigate("Login");
            }
        }) 
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }
}

export default LoaderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})