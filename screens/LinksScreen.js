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
import uuid from "uuid";

import Firebase from "../api/config";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Add Spending"
  };

  state = { desc: "", amount: 0, date: new Date(), image: null };

  handleAddItem = myData => {
    // Firebase dont take in date object?
    myData.date = myData.date.toLocaleDateString();
    const { imageURL } = this.state;
    Firebase.database()
      .ref("users/joel")
      .push({
        desc: this.state.desc,
        amount: Number(this.state.amount),
        date: this.state.date,
        imageURL: imageURL
      });

    // this.props.navigation.navigate("Home", { test: "some data from link screen" });
  };

  pickImage = async () => {
    // Permissions.askAsync(Permissions.CAMERA)
    //   .then(status => {
    //     if (status === "granted") {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
    //   .then(data => {
    //     console.log(data)
    //   });

    // Ask for permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      // Do camera stuff
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });

        // Uploading part
        try {
          const imageURL = await this.uploadImageAsync(result.uri);
          this.setState({ imageURL });
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      // Permission denied
      throw new Error("Camera permission not granted");
    }
  };

  uploadImageAsync = async uri => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = Firebase.storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

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
            onPress={this.pickImage}
          />

          <Button
            title="Get new location"
            onPress={this.pickImage}
          />

          {/* {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
          )} */}
          {this.state.imageURL && <Text>{this.state.imageURL}</Text>}
        </View>

        {/* <Text>{JSON.stringify(this.state)}</Text> */}

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
