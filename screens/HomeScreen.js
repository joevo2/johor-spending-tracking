import React from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Spending"
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>Hello World</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  }
});
