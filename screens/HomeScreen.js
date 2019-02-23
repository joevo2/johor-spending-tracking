import React from "react";
import { View, StyleSheet, ScrollView, Text, FlatList } from "react-native";

const Card = ({ amount = 0, item = "no-name", children }) => (
  <View
    style={{
      borderWidth: 0.5,
      borderColor: "#d6d7da",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10
    }}
  >
    <Text>{item}</Text>
    <Text>RM {amount}</Text>

    {children ? <Text>RM {children}</Text> : null}

    {/* {children && <Text>RM {children}</Text>} */}
  </View>
);
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Spending"
  };

  render() {
    const date = new Date();

    const testData = [
      {
        key: "0",
        amount: 1,
        desc: "Food",
        date: new Date()
      },
      {
        key: "1",
        amount: 2,
        desc: "Food",
        date: new Date()
      },
      {
        key: "3",
        amount: 5,
        desc: "Something",
        date: new Date()
      }
    ];

    // const total = testData.map(item => item.amount)
    // const total = testData.map(item => {
    //   return item.amount;
    // }); // [1, 2, 5]

    // const totalAmount = total.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue;
    // }, 3);

    const totalAmount = testData
      .map(item => item.amount)
      .reduce((acc, value) => acc + value);

    // let totalAmount = 0;
    // for (let i = 0; i < testData.length; i++) {
    //   totalAmount = totalAmount + testData[i].amount;
    // }

    return (
      <View style={styles.container}>
        {/* Main content */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#d6d7da"
            }}
          >
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#d6d7da",
                padding: 10,
                backgroundColor: "lightgrey"
              }}
            >
              <Text>{date.toLocaleDateString()}</Text>
            </View>

            <FlatList
              data={testData}
              renderItem={({ item }) => (
                <Card amount={item.amount} item={item.desc} />
              )}
            />
            
          </View>
        </ScrollView>

        {/* Static bar  */}
        <View style={styles.staticBottomBar}>
          <Text>Total</Text>
          <Text>RM{totalAmount}</Text>
        </View>
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
    // paddingTop: 30
  },
  staticBottomBar: {
    backgroundColor: "lightgrey",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
