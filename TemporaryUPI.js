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
import AsyncStorage from "@react-native-async-storage/async-storage";
const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;
import { Linking } from "react-native";
import { Alert } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import QR from "./assets/QR.svg";
import { Touchable } from "react-native";

const screenWidth = Dimensions.get("window").width;

function ratioedSize(size1, size2) {
  if (screenWidth > 400) {
    return size1;
  } else {
    return size2;
  }
}

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

export function UPIScreen() {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        {/* IMAGE */}
        <QR
          height={scale(500)}
          width={scale(500)}
          style={{
            marginTop: scale(-150),
            alignSelf: "center",
          }}
        />
      </View>
      <Text
        style={[
          styles.servicesText1,
          styles.shadow,
          {
            marginTop: scale(-170),
          },
        ]}
      >
        {"SCAN QR CODE\n\nOR\n"}
      </Text>
      <Text
        styles={[
          styles.servicesText1,
          {
            marginTop: scale(40),
            fontSize: scale(20),
          },
        ]}
      >
        please copy the below UPI ID to pay
      </Text>
      <View style={[styles.shadow, styles.services_box1]}>
        <Text
          selectable={true}
          //    onPress={() => {
          //           copyToClipboard();
          //         }}
          style={styles.servicesText}
        >
          umarao16@okaxis
        </Text>
      </View>
      <View
        style={{
          width: scale(290),
          marginTop: scale(50),
          borderWidth: scale(1.5),
          borderRadius: scale(11),
        }}
      >
        <Text
          style={{
            paddingTop: scale(10),
            paddingLeft: scale(10),
            paddingRight: scale(10),
            fontSize: ratioedSize(scale(12), scale(20)),
            fontWeight: "bold",
            width: "70%",
          }}
        >
          **NOTE**
        </Text>
        <Text
          style={{
            fontSize: ratioedSize(scale(12), scale(18)),
            //textAlign: "center",
            paddingBottom: scale(10),
            paddingLeft: scale(10),
            paddingRight: scale(10),
            width: "100%",
          }}
        >
          {
            "Please share the Screenshot of payment deatils on our Whatsapp HelpLine no.: 8871306576 for the confirmation of your payment along with the patient's name"
          }
        </Text>
      </View>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          {
            marginTop: scale(60),
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
    height: scale(60),
    backgroundColor: "white",
    borderRadius: scale(18),
  },
  servicesText: {
    //textAlign: "center",
    //marginTop: 40,
    fontSize: ratioedSize(scale(16), scale(16)),
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: scale(15),
    color: "black",
  },
  servicesText1: {
    textAlign: "center",
    fontSize: ratioedSize(scale(16), scale(20)),
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    color: "grey",
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
    bottom: scale(-20),
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
