import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Eclipse from "./assets/eclipse.svg";
import PersonIcon from "./assets/personicon.svg";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { backendIP } from "./NetworkConfig";

const Genders = ["Male", "Female", "Other"];

const createTwoButtonAlert = (alert_title, msg, text1, text2) =>
  Alert.alert(alert_title, msg, [
    {
      text: text1,
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: text2, onPress: () => console.log("OK Pressed") },
  ]);

  const screenWidth = Dimensions.get("window").width;
 

  function ratioedSize(size1, size2) {
    if (screenWidth > 400) {
      return size1;
    }
    else {
      return size2;
    }
  }

export function CreateAccScreen({ navigation }) {
  const [mPhoneNumber, setPhoneNumber] = React.useState(null);
  const [mFirstName, setFirstName] = React.useState(null);
  const [mLastName, setLastName] = React.useState(null);
  const [mAddress, setAddress] = React.useState(null);
  const { height, width } = Dimensions.get("window");
  const [mOptionGender, setOptionGender] = React.useState(null);

  const createTable = async (firstName, lastName, phone, address, gender) => {
    try {
      const response = await axios.post(
        backendIP + "/create_acc",
        {
          first_name_: firstName,
          last_name_: lastName,
          phone_: phone,
          address_: address,
          gender_: gender,
          Pending: "None",
        }
      );
    } catch (error) {
      if (error.response.status === 409) {
        throw error.response.status;
      }
      console.error(error);
    }
  };

  const createIt = async (a, b, c, d, e) => {
    if (c.length == 10) {
      try {
        await createTable(a, b, c, d, e);
        await AsyncStorage.setItem("PhoneNumber", mPhoneNumber.toString());
        navigation.navigate("HomeScreen");
      } catch (status) {
        if (status == 409) {
          createTwoButtonAlert(
            "Already Registered",
            "The Phone Number is already registerd",
            "Ok",
            "Try again"
          );
        }
      }
    } else {
      createTwoButtonAlert(
        "Invalid Number",
        "The Phone must be of length 10",
        "Ok",
        "Try again"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.absoluteContainer, { height, width }]}>
        <Eclipse />
      </View>

      <View
        style={[
          styles.innerContainer,
          {
            marginTop: -scale(90),
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <PersonIcon />
        </View>

        <View style={[styles.titleContainer]}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <TextInput
          style={[
            styles.input_button,
            styles.shadow,
            {
              marginTop: scale(-10),
            },
          ]}
          placeholder="First Name"
          onChangeText={(e) => {
            setFirstName((prev) => e);
          }}
        />

        <View
          style={{
            marginTop: ratioedSize(scale(8), scale(20)),
          }}
        ></View>

        <TextInput
          style={[styles.input_button, styles.shadow]}
          placeholder="Last Name"
          onChangeText={(e) => {
            setLastName((prev) => e);
          }}
        />

        <View
          style={{
            marginTop: ratioedSize(scale(8), scale(20)),
          }}
        ></View>

        <TextInput
          style={[styles.input_button, styles.shadow]}
          keyboardType="numeric"
          maxLength={10}
          placeholder="Phone No."
          value={mPhoneNumber}
          onChangeText={(e) => {
            setPhoneNumber((prev) => e);
          }}
        />

        <View
          style={{
            marginTop: ratioedSize(scale(8), scale(20)),
          }}
        ></View>

        <TextInput
          style={[styles.input_button, styles.shadow]}
          placeholder="Address"
          onChangeText={(e) => {
            setAddress((prev) => e);
          }}
        />
        <View
          style={{
            marginTop: ratioedSize(scale(8), scale(20)),
          }}
        ></View>

        <SelectDropdown
          buttonTextStyle={{
            color: "#2AACAC",
          }}
          buttonStyle={[styles.input_button, styles.shadow]}
          data={Genders}
          onSelect={(selectedItem, index) => {
            setOptionGender(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />

        <TouchableOpacity
          style={[styles.login_button, styles.shadow]}
          onPress={() => {
            createIt(
              mFirstName,
              mLastName,
              mPhoneNumber,
              mAddress,
              mOptionGender
            );
          }}
        >
          <Text
            style={{
              color: "#2AACAC",
              fontWeight: "bold",
            }}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  absoluteContainer: {
    position: "absolute",
    bottom: 0,
    transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }],
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20%",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: "5%",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: "10%",
  },
  title: {
    fontSize: ratioedSize(scale(15), scale(25)),
    fontWeight: "bold",
  },
  input_button: {
    width: "80%",
    height: 50,
    marginTop: "5%",
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: "5%",
  },
  shadow: {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#2AACAC",
    shadowOpacity: 20,
    shadowRadius: 2,
    elevation: 12,
  },
  login_button: {
    width: "30%",
    borderRadius: 11,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: ratioedSize(scale(30), scale(50)),
    backgroundColor: "white",
    color: "#2AACAC",
    fontWeight: "bold",
  },
});
