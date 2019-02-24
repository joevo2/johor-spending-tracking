import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
  Platform,
  Button,
  Image
} from "react-native";
import { ImagePicker, Permissions } from "expo";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Add Spending"
  };

  state = { date: new Date(), image: null };

  render() {
    const { image } = this.state;
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

          <Button
            title="Pick an image from camera roll"
            onPress={async () => {
              // Ask for permission
              const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
              );
              if (status === "granted") {
                // Do camera stuff
                let result = await ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  aspect: [4, 3]
                });

                console.log(result);

                if (!result.cancelled) {
                  this.setState({ image: result.uri });
                }
              } else {
                // Permission denied
                throw new Error("Camera permission not granted");
              }
            }}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <Text>{JSON.stringify(this.state)}</Text>

        {/* Bottom Bar */}
        <TouchableOpacity
          onPress={() => alert("button pressed")}
          title="Learn More"
          onPress={() => {
            alert(JSON.stringify(this.state));
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
