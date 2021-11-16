import React, { Component } from "react";
import { View, StyleSheet } from "react-native"
import HomeScreen from "../components/HomeScreen";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  




class DashboardScreen extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        getData().then(user => {
            console.log("user", user)
            this.setState({user: user})
        })


    }
    render() {
        return (
            <View style={styles.container}>
      {this.state.user && <HomeScreen
      userName={this.state?.user?.userName}
      userEmail={this.state?.user?.userEmail}
      userId={this.state?.user?.userId}
      navigation={this.props.navigation}
      />}
      <StatusBar style="auto" />
    </View>
        )
    }
}

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center'
    }
})