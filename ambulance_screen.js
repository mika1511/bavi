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
import { PixelRatio } from "react-native";

const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;

const ratio = widthD/320;

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;


function ratioedSize(size1, size2) {
  if (widthD > 400) {
    return size1;
  }
  else {
    return size2;
  }
}

import { Linking } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
export function AmbulanceScreen() {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}><ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.servicesContainer,
          {
            marginTop: heightD * 0.015,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("WithO2Support");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
                fontSize: getFontSize(26),
          }]}>{"With O2 Support"}</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("BLS");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
                fontSize: getFontSize(26),
          }]}>Basic Life Support</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("ALS");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
                fontSize:  getFontSize(26),
          }]}>Advanced Life Support</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: heightD * 0.01,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("NBB");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
                fontSize:  getFontSize(26),
          }]}>New Born Baby</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("FDB");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
                fontSize: getFontSize(26),

          }]}>Freezer For Dead Body</Text>
        </TouchableOpacity>
      </View></ScrollView>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          
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
    height: 100,
    backgroundColor: "#2AA8A0",
    borderRadius: 18,
    marginBottom: 30,
  },
  servicesText: {
    textAlign: "center",
    marginTop: getFontSize(35),
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
    //marginTop: scale(555),
    bottom:5,
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
