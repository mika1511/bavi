import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Eclipse from "./assets/eclipse.svg";
import Logo from "./assets/Logo.svg";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MainScreen({ navigation }) {
  const Navigation = useNavigation();
  return (
    <>
      <SafeAreaView
        style={{
          flex: 0.3,
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Eclipse />
        <View
          style={{
            position: "absolute",
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 0.7,
              //justifyContent:'center',
              //alignSelf: "center",
              marginTop: scale(180),
              alignItems: "center",
            }}
          >
            <Logo />
          </View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              justifyContent: "center",
              textAlign: "center",
              marginTop: -90,
              color: "#2AACAC",
            }}
          >
            BAVI
          </Text>
          {/* <TouchableOpacity
            onPress={() => {
              Navigation.navigate("CreateAcc");
            }}
          >
            <Text style={[styles.admin_cont, { fontSize: 20 }]}>ADMIN</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              try {
                AsyncStorage.getItem("PhoneNumber").then((value) => {
                  if(value) {
                    console.log(value);
                    navigation.navigate("HomeScreen");
                  }
                  else {
                    navigation.navigate("Login");
                  }
                });
              }
              catch(error) {
                console.log(error);
              }
            }}
          >
            <View
              style={{
                marginTop: scale(50),
              }}
            ></View>
            <Text
              style={[styles.admin_cont, { textAlign: "center", fontSize: 20 }]}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  admin_cont: {
    width: scale(280),
    borderRadius: 11,
    height: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(60),
    marginLeft: scale(40),
    backgroundColor: "#2AACAC",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  customer_cont: {
    width: scale(280),
    borderRadius: 11,
    height: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(40),
    marginLeft: scale(40),
    backgroundColor: "#2AACAC",
    color: "white",
    fontWeight: "bold",
  },
});
