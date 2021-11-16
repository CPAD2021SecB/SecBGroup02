import React from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Button, Alert, Text } from 'react-native';
import firebase from 'firebase/compat/app';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            meaningText: '',
        }

    }

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    searchDictionary = async () => {
        const db = firebase.firestore();
        const snapshot = await db.collection('dictionary_history').add({id: this.generateUUID(),  word: this.state.searchText, userId: this.props.userId, userEmail: this.props.userEmail });
        let url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + this.state.searchText;
        let response = await fetch(url);
        let result = await response.json();
        let meaningText = result[0].meanings[0].definitions[0].definition;
        this.setState({ meaningText: meaningText })
    }

    showMyLearnings = async () => {
        let myLearnings = []
        const db = firebase.firestore();
        const snapshot = await db.collection('dictionary_history').get();
        snapshot.docs.map(doc => {
            let data = doc.data()
            if (data.userEmail === this.props.userEmail) {
                myLearnings.push(data)
            }
        })
        console.log("myLearnings", myLearnings)

        this.props.navigation.navigate("MyLearning", {
            learnings: myLearnings,
            navigation: this.props.navigation
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    <View style={{
                        alignItems: 'center',
                        marginBottom: 100
                    }}>
                        <Text style={{
                            fontSize: 15
                        }}>Hello, {this.props.userName}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Your Mini Dictionary</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => {
                            this.setState({ searchText: value })
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
                    <View style={styles.button1}>
                        <Button
                            title="My Learnings"
                            onPress={() => this.showMyLearnings()}
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
    button1: {
        height: 40,
        margin: 12,
    },
    searchResultText: {
        marginHorizontal: 20
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
