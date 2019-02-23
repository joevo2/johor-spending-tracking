import React from "react";
import { StyleSheet, View, Text } from "react-native";

const LinkStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "black"
  }
});

export const Card = ({ amount = 0, item = "no-name", children }) => (
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

export const AnotherStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "green"
  }
});

export default LinkStyles;
