import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, DeviceHeight, DeviceWidth } from "react-native"
const google = require("../assets/google.png")
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
    }
  }

class LoginScreen extends Component {


    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "962208019760-4set7cqs04aaijajb9lgdg49l9qbplhm.apps.googleusercontent.com  ",
                iosClientId: "962208019760-lv2niuu8kfrbs3451q1p1ouacc0m6djr.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                await storeData({
                    userName: result.user.name,
                    userEmail: result.user.email,
                    userId: result.user.id
                })
                this.props.navigation.navigate("Dashboard")
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={[{
                    height: 100,
                    width: 300,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                    maxHeight: 50,
                    backgroundColor: "#8BC341",
                    alignSelf: 'center',
                    borderRadius: 10,

                }, {
                    justifyContent: 'center',
                    alignItems: 'center',
                }, { backgroundColor: "#D74937" }]} onPress={this.signInWithGoogleAsync}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.30, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Image source={google} />
                        </View>
                        <View style={{ flex: 0.70, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ color: 'white', left: 20 }}>Sign in With Google</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})