import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Eclipse from "./assets/eclipse.svg";
import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export function OtpScreen({ route }) {
  // const [otp, setOtp] = useState(['-', '-', '-', '-', '-', '-']);
  // const [otpVal, setOtpVal] = useState('');
  const [phoneNumber, setPhoneNumber] = React.useState(
    route.params.phoneNumber
  );

  const [mName, setMname] = React.useState(
    route.params.namex
  );

  const Navigation = useNavigation();
  return (
    <View
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
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            alignSelf: "center",
            //marginLeft: 130,
            marginTop: 160,
          }}
        >
          Enter OTP
        </Text>

        <Text
          style={{
            marginTop: 30,
            alignSelf: "center",
            //marginLeft: 50,
            fontSize: 20,
          }}
        >
          {" "}
          Sent in the number {phoneNumber}{" "}
        </Text>

        <View
          style={[
            styles.otpBoxesContainer,
            {
              alignSelf: "center",
              //marginLeft: 140,
              marginTop: 30,
            },
          ]}
        >
          <TextInput
            style={[
              styles.otpBox,
              {
                fontSize: 25,
              },
            ]}
            keyboardType="numeric"
            maxLength={4}
          ></TextInput>
        </View>
        <View
          style={{
            alignSelf: "center",
            //marginLeft: -20,

          }}
        >
          <TouchableOpacity
            style={[styles.login_button, styles.shadow]}
            onPress={() => {
              Navigation.navigate("HomeScreen", {
                namex: mName,
              });
            }}
          >
            <Text style={{ color: "#2AACAC", fontWeight: "bold" }}>
              {" "}
               {"   CONTINUE   "}{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
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
    backgroundColor: "white",
    color: "#2AACAC",
    fontWeight: "bold",
  },

  otpBoxesContainer: {
    flexDirection: "row",
  },
  otpBox: {
    padding: 10,
    //marginRight: 10,
    borderWidth: 1,
    borderColor: "grey",
    height: 45,
    width: 100,
    textAlign: "center",
  },

})