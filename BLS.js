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
import { useState } from "react";
const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;
import { Linking } from "react-native";
import { Alert } from "react-native";
//import RoundedButton from "./RoundedButton";

const createContactOption = () =>
  Alert.alert("Open With ", "Choose an Option", [
    {
      text: "cancel",
      status: "cancel",
    },
    {
      text: "WhatsApp",
      onPress: () => Linking.openURL(`https://wa.me/+918871306576`),
    },
    { text: "Phone Call", onPress: () => Linking.openURL(`tel:$8871306576`) },
  ]);

export function BLS() {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.servicesContainer,
          {
            marginTop: heightD * 0.14,
          },
        ]}
      >
        <View style={[styles.services_box1, styles.shadow]}>
          <Text
            style={[
              styles.servicesText,
              {
                marginTop: scale(10),
              },
            ]}
          >
            {" "}
            With Ventilator:{" "}
          </Text>
          <Text style={styles.servicesText}> Rs.28/km </Text>
          <View
            style={[
              styles.container1,
              {
                display: "flex",
              },
            ]}
          >
            <View
              style={{
                //display: "flex",
                marginTop: scale(30),
                marginLeft: 200,
              }}
            >
              <View style={styles.buttonContainer}>
                <Button style={{}} title=" - " onPress={decrement} />
                <Text
                  style={[
                    styles.countText,
                    {
                      marginTop: scale(6),
                    },
                  ]}
                >
                  {count} km
                </Text>
                <Button title=" + " onPress={increment} />
              </View>
              <View
                style={{
                  backgroundColor: "black",
                  height: scale(30),
                  width: "40%",
                  //alignSelf: "flex-end",
                  marginLeft: scale(5),
                  border: 1,
                  borderColor: "white",
                  marginTop: scale(10),
                  marginLeft: 57,
                  zIndex: 60,
                }}
              ></View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          style={[styles.services_box1, styles.shadow]}
          onPress={() => {
            createContactOption();
          }}
        >
          <TelephoneIcon
            height={scale(50)}
            width={scale(25)}
            style={{
              color: "white",
              marginLeft: scale(10),
              marginTop: scale(8),
            }}
          />
          <Text
            style={[
              styles.servicesText,
              {
                marginTop: scale(-42),
                textAlign: "left",
              },
            ]}
          >
            {"\t     "}Contact Us:{" "}
          </Text>
          <Text style={styles.servicesText}> +91-8871306576</Text>
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
            marginTop: scale(300),
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
    height: 140,
    backgroundColor: "#2AA8A0",
    borderRadius: 18,
    marginBottom: 30,
  },
  servicesText: {
    //textAlign: "center",
    //marginTop: 40,
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
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
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'white',
    // width:'45%',
    // height:scale(15),
    // //alignSelf:'center',
    // marginLeft: scale(20),
    // borderRadius:scale(11),
  },
  countText: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    width: "40%",
    height: scale(40),
    marginTop: scale(2),
    borderRadius: scale(11),
    alignSelf: "flex-start",
    marginLeft: -scale(125),
    color: "#2AACAC",
  },
});
