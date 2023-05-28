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
import { styles } from "./css_styles";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { OtpScreen } from "./otp_page";
import { HomeScreen } from "./home_screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, ScaledSheet } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import axios from "axios";
import { Alert } from "react-native";
import { backendIP } from "./NetworkConfig";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const test = screenWidth > 400;

export function LoginScreen() {
  const navigation = useNavigation();
  const [phoneNo, setPhoneNo] = React.useState("");

  const handleLogin = async () => {
    axios
      .get(
        backendIP + `/get_user_details/first_name`,
        {
          params: { phone_no: phoneNo },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.m_response === "Customer not found") {
          Alert.alert("Error", "Customer not found");
        } else {
          AsyncStorage.setItem("PhoneNumber", phoneNo);
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        //if(response.data == "Customer not found") { Alert.alert("fuck"); }
        console.error("Error:", error);
        Alert.alert(
          "No account found",
          "It looks like you haven't registered, please register first"
        );
      });
  };

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
        <Eclipse width={scale(350)} />
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

        <View styles={[styles.container]}>
          <View
            styles={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                justifyContent: "center",
                marginLeft: scale(90),
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                }}
              ></Text>
            </View>
          </View>

          <TextInput
            style={[
              styles.input_button,
              styles.shadow,
              {
                fontSize: 18,
              },
            ]}
            keyboardType="numeric"
            maxLength={10}
            placeholder="Phone No."
            onChangeText={(e) => {
              setPhoneNo((prev) => e);
            }}
          />
          <TouchableOpacity
            style={[styles.login_button, styles.shadow]}
            onPress={() => {
              handleLogin();
            }}
          >
            <Text style={{ color: "#2AACAC", fontWeight: "bold" }}>
              {" "}
              LOGIN{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
          style={{
            marginTop: scale(20),
            width: scale(110),
            height: scale(20),
            borderRadius: 20,
            backgroundColor: "#2aacac",
            borderColor: "white",
            borderWidth: 1,
          }}
            onPress={() => {
              navigation.navigate("CreateAcc");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white", 
              }}
            >
              {"Sign Up Instead"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </SafeAreaView>
  );
}
