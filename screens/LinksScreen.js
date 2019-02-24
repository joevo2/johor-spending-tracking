import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
  Platform
} from "react-native";

import Firebase from "../api/config";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Add Spending"
  };

  state = { desc: "", amount: 0, date: new Date() };

  handleAddItem = myData => {
    // Firebase dont take in date object?
    myData.date = myData.date.toLocaleDateString();
    Firebase.database()
      .ref("users/joel")
      .push({
        desc: this.state.desc,
        amount: Number(this.state.amount),
        date: this.state.date
      });

    // this.props.navigation.navigate("Home", { test: "some data from link screen" });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.amountBar}>
            <Text>Amount</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>RM</Text>
              <TextInput
                style={{
                  height: 40,
                  width: 80,
                  borderColor: "gray",
                  borderWidth: 1
                }}
                onChangeText={userInput => {
                  this.setState({ amount: userInput });
                }}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={userInput => {
              this.setState({ desc: userInput });
            }}
            placeholder={"Description"}
          />

          <View>
            {Platform.OS === "ios" ? (
              <DatePickerIOS
                date={this.state.date}
                onDateChange={date => this.setState({ date })}
              />
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  const { year, month, day } = await DatePickerAndroid.open({
                    date: new Date()
                  });
                  this.setState({ date: new Date(year, month, day) });
                }}
              >
                <Text>{this.state.date.toString()}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text>{JSON.stringify(this.state)}</Text>

        {/* Bottom Bar */}
        <TouchableOpacity
          onPress={() => {
            this.handleAddItem(this.state);
          }}
          style={{
            backgroundColor: "lightgrey",
            padding: 20,
            alignItems: "center"
          }}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  amountBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10
  }
});
