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
import { useNavigation } from "@react-navigation/native";
import { backendIP } from "./NetworkConfig";

const Genders = ["Male", "Female", "Other"];

const editAllDetails = async (
  phoneNo,
  this_name,
  this_last_name,
  this_address,
  this_gender
) => {
  try {
    await axios.get(
      backendIP + `/edit_details/first_name`,
      {
        params: {
          phone_no: phoneNo,
          new_name: this_name,
        },
      }
    );

    await axios.get(
      backendIP + `/edit_details/last_name`,
      {
        params: {
          phone_no: phoneNo,
          new_name: this_last_name,
        },
      }
    );

    await axios.get(
      backendIP + `/edit_details/address`,
      {
        params: {
          phone_no: phoneNo,
          new_name: this_address,
        },
      }
    );

    await axios.get(
      backendIP + `/edit_details/gender`,
      {
        params: {
          phone_no: phoneNo,
          new_name: this_gender,
        },
      }
    );

  } catch (error) {
    console.log(error);
    createTwoButtonAlert(
      "Error",
      "Error while editing profile",
      "Ok",
      "Try again"
    );
  }
};

const createTwoButtonAlert = (alert_title, msg, text1, text2) =>
  Alert.alert(alert_title, msg, [
    {
      text: text1,
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: text2, onPress: () => console.log("OK Pressed") },
  ]);

export function EditProfile({ }) {
  const [mPhoneNumber, setPhoneNumber] = React.useState(null);
  const [mFirstName, setFirstName] = React.useState(null);
  const [mLastName, setLastName] = React.useState(null);
  const [mAddress, setAddress] = React.useState(null);
  const { height, width } = Dimensions.get("window");
  const [mOptionGender, setOptionGender] = React.useState(null);
  const [mNo, setNo] = React.useState(null);
  const navigation = useNavigation();

  AsyncStorage.getItem("PhoneNumber").then((PhoneTest) => {
    setNo(PhoneTest);
  });

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
          <Text style={styles.title}>Edit Profile</Text>
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
            marginTop: scale(20),
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
            marginTop: scale(20),
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
            marginTop: scale(20),
          }}
        ></View>

        <SelectDropdown
          buttonTextStyle={{
            color: "#2AACAC",
          }}
          buttonStyle={[styles.input_button, styles.shadow]}
          data={Genders}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setOptionGender(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />

        <TouchableOpacity style={[styles.login_button, styles.shadow]}
        
        onPress={() => {
            editAllDetails(mNo, mFirstName, mLastName, mAddress, mOptionGender);
            navigation.navigate("HomeScreen");
        }}>
          <Text
            style={{
              color: "#2AACAC",
              fontWeight: "bold",
            }}
          >
            CONFIRM
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
    fontSize: 30,
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
    marginTop: scale(50),
    backgroundColor: "white",
    color: "#2AACAC",
    fontWeight: "bold",
  },
});
