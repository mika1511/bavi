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

import { PixelRatio } from "react-native";
const screenWidth = Dimensions.get("window").width;

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;


function ratioedSize(size1, size2) {
  if (screenWidth > 400) {
    return size1;
  }
  else {
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

export function O2Screen() {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.servicesContainer,
          {
            marginTop: heightD * 0.1,
          },
        ]}
      >
        <TouchableOpacity 
         onPress={() => {
          const paymentObject = [{'id': 1, 'name': "O2 CYLINDER BOOKING", 'price' : 10000}];
          try {
            AsyncStorage.setItem("current_service", JSON.stringify(paymentObject))
            .then(() => {
              console.log("Data saved");
            })
            const f = AsyncStorage.getItem("current_service");
            console.log(paymentObject);
          
            Navigation.navigate("PaymentScreenHomeCare");
          } catch(error) {
            console.log(error);
          }
        }}
        style={[styles.services_box1, styles.shadow]}>
          <Text
            style={[
              styles.servicesText,
              {
                marginTop: scale(10),
              },
            ]}
          >
            {"  "}
            Cylinder Price:
          </Text>
          <Text style={styles.servicesText}>  Rs.500/day</Text>
        </TouchableOpacity>

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
        style={{
          width: "80%",
          marginTop: scale(100),
          borderWidth: scale(1.5),
          borderRadius: scale(11),
        }}
      >
        <Text
          style={{
            paddingTop: scale(10),
            paddingLeft: scale(10),
            paddingRight: scale(10),
            fontSize: getFontSize(22),
            fontWeight: "bold",
            width: "70%",
          }}
        >
          **NOTE**
        </Text>
        <Text
          style={{
            fontSize: getFontSize(18),
            //textAlign: "center",
            paddingBottom: scale(10),
            paddingLeft: scale(10),
            paddingRight: scale(10),
            width: "95%",
            fontWeight:"600",
          }}
        >
          {
            "Rs.𝟭𝟬,𝟬𝟬𝟬 /- needs to be deposited, the rest will be refunded based on number of days rented"
          }
        </Text>
      </View>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          {
            marginTop: scale(100),
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
    height: 100,
    backgroundColor: "#2AA8A0",
    borderRadius: 18,
    marginBottom: 30,
  },
  servicesText: {
    //textAlign: "center",
    //marginTop: 40,
    fontSize: getFontSize(26),
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
    marginTop: scale(100),
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
