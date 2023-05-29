import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Link } from "@react-navigation/native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import HomeIconSvg from "./assets/home_icon.svg";
import PersonIcon from "./assets/personicon.svg";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import TelephoneIcon from "./assets/telephoneIcon.svg";
import React from "react";
import axios from "axios";
import { backendIP } from "./NetworkConfig";

const createOrder = async(servicesName, price, phoneNo) => {
  try {
    const response = await axios.get(backendIP + "/create_order", {
      params: {
        name_array: servicesName,
        price: price,
        phone_number: phoneNo
      }
    });
    console.log(response.data);
  }catch(error) {
    console.log(error);
  }
}

const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function PaymentScreen() {
  const services = [];
  const [servicesString, setServicesString] = React.useState(null);
  const [mTotal, setTotal] = React.useState(0);
  const [mPhone, setPhone] = React.useState(null);
  
  React.useEffect(() => {
    AsyncStorage.getItem("current_service").then((value) => {
      const cur_data = JSON.parse(value);
      let total_price = 0;
      for (var i = 0; i < cur_data.length; i++) {
        services.push(cur_data[i].name);
        total_price += cur_data[i].price;
      }
      console.log(total_price);
      setTotal(total_price);
      setServicesString(services.toString());
    AsyncStorage.getItem("PhoneNumber").then((value) => {
      setPhone(value);
    })
    });
  }, [])

  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.servicesContainer,
          {
            marginTop: scale(150),
          },
        ]}
      >
        <View>
          <Text style={{
            marginTop: scale(-60),
            fontWeight: "600",
            fontSize: scale(20),
            marginRight: scale(20),
            color: "black",
            borderWidth: 2,
            borderColor: "#2AACAC",
            borderRadius: 12,
            borderTopWidth: scale(4),
            borderLeftWidth: scale(0),
            borderBottomWidth: scale(4),
            borderRightWidth: scale(0),
            height: scale(45),
            textAlignVertical: "center",
          }}>{"   Amount Payable: ₹ "}{mTotal}{"  "}</Text>
        </View>
        <View style={{
          marginTop: scale(19.69),
        }}>

        </View>
        <TouchableOpacity 
        onPress={() => {
          console.log(servicesString)
          createOrder(servicesString, mTotal, mPhone);
          //Linking.openURL("upi://pay?pa=hurvashidewangan8118@okicici&pn=HurvashiDewangan&cu=INR&am="+mTotal);
        }}
        style={[styles.services_box1, styles.shadow]}>
          <Text
            style={[
              styles.servicesText,
              {
                marginTop: scale(20),
              },
            ]}
          >
            {"  "}
            Pay Online{" "}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: scale(0),
          }}
        ></View>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text
            style={[
              styles.servicesText,
              {
                marginTop: scale(20),
              },
            ]}
          >
            {" "}
            Pay via Cash{" "}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>
      </View>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          {
            marginTop: scale(260),
          },
        ]}
      >
        <HomeIconSvg
          style={{
            marginLeft: "17.5%",
            marginTop: scale(13),
          }}
          onPress={() => {
            Navigation.navigate("HomeScreen");
          }}
        />

        <View
          style={{
            justifyContent: "center",
            paddingVertical: scale(10),
          }}
        >
          <PersonIcon
            width={scale(30)}
            style={{
              marginLeft: "72.5%",
              marginTop: scale(-75),
            }}
            onPress={() => {
              Navigation.navigate("Settings");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  servicesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  services_box1: {
    width: widthD * 0.8,
    height: scale(80),
    backgroundColor: "white",
    borderRadius: scale(18),
    marginBottom: scale(30),
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#2AA8AC",
    shadowOpacity: 50,
    shadowRadius: 2,
    elevation: 11,
  },
  servicesText: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#2aacac",
  },
  shadow: {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#2AA8AC",
    shadowOpacity: 50,
    shadowRadius: 2,
    elevation: 11,
  },
  downNavigator: {
    position: "relative",
    marginTop: scale(555),
    width: scale(295),
    height: verticalScale(45),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(30),
  },
  shadows: {
    shadowOffset: { width: scale(4), height: verticalScale(4) },
    shadowColor: "#2AA8AC",
    shadowOpacity: 50,
    shadowRadius: scale(2),
    elevation: scale(11),
  },
});
