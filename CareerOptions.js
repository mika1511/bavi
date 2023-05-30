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

const Options = ["Doctor", "Nurse","Attender"];

export function CareerOption() {
  const navigation = useNavigation();
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
          <View style={{
            alignSelf: "center",
          }}>
            <SelectDropdown
              buttonTextStyle={{
                color: "#2AACAC",
              }}
              buttonStyle={[styles.input_button, styles.shadow]}
              data={Options}
              onSelect={(selectedItem, index) => {
                setSpecialization(selectedItem);
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
                fontSize: 18,
              },
            ]}
            placeholder="Specialization"
            onChangeText={(e) => {
              setSpecialization((prev) => e);
            }}
          />
          <TouchableOpacity style={[styles.login_button, styles.shadow]}>
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
        borderRadius: 11,
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        textAlignVertical: "center",
      },
      shadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowColor: "#2AACAC",
        shadowOpacity: 20,
        shadowRadius: 2,
        elevation: 5,
      },
      login_button: {
        width: "30%",
        borderRadius: 11,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        //marginLeft: 135,
        alignSelf: "center",
        backgroundColor: "white",
        color: "#2AACAC",
        fontWeight: "bold",
      },
})