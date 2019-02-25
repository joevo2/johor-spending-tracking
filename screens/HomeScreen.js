import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Image
} from "react-native";

import Firebase from "../api/config";

const Card = ({ amount = 0, item = "no-name", children, image }) => (
  <View
    style={{
      borderWidth: 0.5,
      borderColor: "#d6d7da",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10
    }}
  >
    <Text>{item}</Text>
    <Text>RM {amount}</Text>

    {children ? <Text>RM test {children}</Text> : null}
    <Image style={{ width: 40, height: 40 }} source={{ uri: image }} />

    {/* {children && <Text>RM {children}</Text>} */}
  </View>
);
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Spending"
  };

  constructor(props) {
    super(props);
    this.state = {};
    const items = Firebase.database().ref("users/joel");
    items.on("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        // Convert firebase objects into an array
        const convertedItems = Object.values(data);
        // [
        //   {desc: 'dasd'},
        //   {desc: 'asdad'}
        // ]
        this.setState({ items: convertedItems });
      }
    });
  }

  // shouldComponentUpdate(newProps, newState) {
  //   const valueFromOtherScreen = newProps.navigation.getParam("test", false);

  //   if (valueFromOtherScreen) {
  //     alert(valueFromOtherScreen);

  //     // const tempItems = this.state.items
  //     // tempItems.push({valueFromOtherScreen})

  //     // this.setState({items: tempItems})
  //   }

  //   return true
  // }

  render() {
    const date = new Date();
    const testData = this.state.items || [];
    const totalAmount = testData
      .map(item => Number(item.amount))
      .reduce((acc, value) => acc + value, 0);
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
                <Card amount={item.amount} item={item.desc} image={item.imageURL} />
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
