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

const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;
import { Linking } from "react-native";

export function Physiotherapy1() {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
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
        <TouchableOpacity style={[styles.services_box1, styles.shadow]}>
          <Text
            style={[
              styles.servicesText,
              {
                marginTop: scale(10),
              },
            ]}
          >
            {" "}
            Physiotherapy charges:
          </Text>
          <Text style={styles.servicesText}> Rs. 1000 /-</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          style={[styles.services_box1, styles.shadow]}
          onPress={() => {
            Linking.openURL(`tel:$8871306576`);
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
    width: widthD * 0.85,
    height: 100,
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
});
