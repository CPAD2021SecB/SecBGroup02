import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, BackHandler, Platform } from "react-native"


const Item = ({ title }) => (
  <View style={styles1.item}>
    <Text style={styles1.title}>{title}</Text>
  </View>
);




class MyLearning extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (Platform.OS == "android") {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate("Dashboard")
      })
    }
  }
  
  componentWillUnmount() {
    if (Platform.OS == "android") {
      this.backHandler.remove();
    }
  }

  renderItem = ({ item }) => (
    <Item title={item.word} />
  );

  render() {
    console.log('his.props?.navigation?.state?.params?.learnings', this.props?.navigation?.state?.params?.learnings)
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props?.navigation?.state?.params?.learnings}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

export default MyLearning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});