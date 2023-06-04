import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import HomeIconSvg from "./assets/home_icon.svg";
import PersonIcon from "./assets/personicon.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;

const screenWidth = Dimensions.get("window").width;
 

function ratioedsize(size1, size2) {
  if (screenWidth > 400) {
    return size1;
  }
  else {
    return size2;
  }
}

export function HomecareScreen() {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.servicesContainer,
          {
            marginTop: heightD * 0.01,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("Doctor1");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
            fontSize: ratioedsize(scale(16),scale(26)),
          }]}>Doctor</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("Nurse1");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
            fontSize: ratioedsize(scale(16),scale(26)),
          }]}>Nurse</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("Attender1");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={styles.servicesText}>Attender</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("Physiotherapy1");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
        <Text style={[styles.servicesTextP,{
          fontSize: ratioedsize(scale(16),scale(26)),
        }]}>Physiotherapy</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("Dietfood1");
          }}
          style={[styles.services_box1, styles.shadow]}
        >
          <Text style={[styles.servicesText,{
            fontSize: ratioedsize(scale(16),scale(26)),
          }]}>Diet Food</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          {
            marginTop: scale(10),
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
    textAlign: "center",
    marginTop: 35,
    
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
