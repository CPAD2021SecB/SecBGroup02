import React from 'react';
import {View, TextInput, StyleSheet, SafeAreaView, Button, Alert, Text} from 'react-native';
import firebase from 'firebase/compat/app';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            meaningText: ''
        }

    }

    searchDictionary = async () => {
        console.log("here");
        const db = firebase.firestore();
        const snapshot = await db.collection('dictionary_history').add({word: this.state.searchText});
        let url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + this.state.searchText;
        let response = await fetch(url);
        let result = await response.json();
        let meaningText = result[0].meanings[0].definitions[0].definition;
        this.setState({meaningText: meaningText})
    }

    render() {
        return(
            <SafeAreaView>
            <View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Your Mini Dictionary</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={(value)=>{
                        this.setState({searchText: value})
                    }}
                    value={this.state.searchText}
                    placeholder="Type your Text"
                />

                <View style={styles.button}>
                    <Button
                        title="Search"
                        onPress={this.searchDictionary}
                    />
                </View>
                <View style={styles.searchResultText}>
                    <Text>{this.state.meaningText}</Text>
                </View>

            </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    button: {
        height: 40,
        margin: 12,
    },
    searchResultText: {
        marginHorizontal:20
    },
    title: {
        alignItems: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 30
    }
});

export default HomeScreen;
