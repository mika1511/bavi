import { StatusBar } from "expo-status-bar";
// import { Dimensions } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput,
} from "react-native";
import Eclipse from "./assets/eclipse.svg";
import Logo from "./assets/Logo.svg";
import PersonIcon from "./assets/personicon.svg";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { OtpScreen } from "./otp_page";
import { HomeScreen } from "./home_screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, ScaledSheet } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import axios from "axios";
import { Alert } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { backendIP } from "./NetworkConfig";
const Options = ["Doctor", "Nurse", "Attender"];

const screenWidth = Dimensions.get("window").width;
 

function ratioedSize(size1, size2) {
  if (screenWidth > 400) {
    return size1;
  }
  else {
    return size2;
  }
}

const createCareerAlert = () => {
  Alert.alert(
    "Thankyou for applying",
    "Your request has been sent successfully- Wait for admin's approval",
    [
      {
        text: "OK",
        // onPress: () => Navigation.navigate("HomeScreen"),
      },
    ]
  );
};

const registerAs = async (option, specialization) => {
  try {
    const ph = await AsyncStorage.getItem("PhoneNumber");
    const response = await axios.get(backendIP + "/register_as", {
      params: {
        phone_no: ph,
        career: option,
        specialization: "none",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export function CareerOption() {
  const navigation = useNavigation();
  const [mCareer, setCareer] = React.useState("");
  const [mSpecialization, setSpecialization] = React.useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          flex: 1,
          bottom: 0,
          transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }],
        }}
      >
        <Eclipse />
      </View>
      <View
        style={{
          position: "absolute",
          flex: 1,
          flexGrow: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            marginTop: scale(100),
            alignItems: "center",
          }}
        >
          <PersonIcon />
        </View>

        <View>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <SelectDropdown
              buttonTextStyle={{
                color: "#2AACAC",
              }}
              buttonStyle={[styles.input_button, styles.shadow]}
              data={Options}
              onSelect={(selectedItem, index) => {
                setCareer(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <TextInput
            style={[
              styles.input_button,
              styles.shadow,
              {
                fontSize: ratioedSize(scale(12),scale(18)),
              },
            ]}
            placeholder="Specialization"
            onChangeText={(e) => {
              setSpecialization((prev) => e);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              registerAs(mCareer, "none");
              createCareerAlert();
              navigation.navigate("Settings");
            }}
            style={[styles.login_button, styles.shadow]}
          >
            <Text style={{ color: "#2AACAC", fontWeight: "bold" }}>
              {" "}
              SUBMIT{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input_button: {
    width: "80%",
    borderRadius: 1,
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(50),
    alignSelf: "center",
    borderRadius: scale(11),
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
  },
  shadow: {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#2AACAC",
    shadowOpacity: scale(20),
    shadowRadius: scale(2),
    elevation: scale(5),
  },
  login_button: {
    width: "30%",
    borderRadius: scale(11),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(50),
    //marginLeft: 135,
    alignSelf: "center",
    backgroundColor: "white",
    color: "#2AACAC",
    fontWeight: "bold",
  },
});
