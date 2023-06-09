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
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-virtualized-view";

const screenWidth = Dimensions.get("window").width;
 

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
    <SafeAreaView style={styles.container}><ScrollView showsVerticalScrollIndicator={false}>
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
          <Text
            style={[
              styles.servicesText,
              {
                marginLeft: scale(8),
                fontSize: ratioedSize(scale(10),scale(14)),
                marginTop: scale(5),
                marginBottom: -scale(5),
              },
            ]}
          >
            Set your distance(in kms):
          </Text>
          <View
            style={[
              {
                alignItems: "center",
                display: "flex",
                marginTop: scale(10),
              },
            ]}
          >
            <View
              style={[
                styles.buttonContainer,
                {
                  alignSelf: "flex-start",
                  marginLeft: scale(10),
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  marginTop: scale(5),
                  height: scale(30),
                  width: scale(30),
                  borderRadius: scale(20),
                  backgroundColor: "#2aacac",
                }}
                onPress={decrement}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    textAlignVertical: "center",
                    fontSize: ratioedSize(scale(12),scale(18)),
                  }}
                >
                  {"-"}
                </Text>
              </TouchableOpacity>
              <TextInput
                placeholder="0"
                keyboardType="numeric"
                maxLength={3}
                value={count.toString()}
                onChangeText={(value) =>
                  setCount(value == 0 ? 0 : parseInt(value))
                }
                style={[
                  styles.countText,
                  {
                    marginTop: ratioedSize(scale(3),scale(5)),
                  },
                ]}
              ></TextInput>
              <TouchableOpacity
                style={{
                  marginTop: scale(5),
                  height: scale(30),
                  width: scale(30),
                  borderRadius: scale(20),
                  backgroundColor: "#2aacac",
                }}
                onPress={increment}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    textAlignVertical: "center",
                    fontSize: ratioedSize(scale(12),scale(18)),
                  }}
                >
                  {"+"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
             onPress={() => {
              const paymentObject = [{'id': 1, 'name': "Ambulance(BLS)", 'price' : count*28}];
              try {
                AsyncStorage.setItem("current_service", JSON.stringify(paymentObject))
                .then(() => {
                  console.log("Data saved");
                })
                const f = AsyncStorage.getItem("current_service");
                console.log(paymentObject);
              
                if(count > 0) {
                  Navigation.navigate("PaymentScreenAmbulance");
                }
              } catch(error) {
                console.log(error);
              }
            }}
              style={{
                marginTop: -scale(40.000232323232),
                borderRadius: scale(20),
                alignSelf: "flex-end",
                marginRight: scale(10),
                backgroundColor: "white",
                height: scale(40),
                width: "40%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: scale(7),
                  fontSize: ratioedSize(scale(13),scale(18)),
                  fontWeight: "bold",
                  color: "#2aacac",
                }}
              >
                {"NEXT >>"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: heightD * 0.01,
          }}
        ></View>

        <TouchableOpacity
          style={[
            styles.services_box1,
            styles.shadow,
            {
              height: scale(100),
            },
          ]}
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
      </View></ScrollView>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          {
            //marginTop: ratioedSize(scale(180),scale(240)),
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
    height: scale(155.5555555),
    backgroundColor: "#2AA8A0",
    borderRadius: scale(18),
    marginBottom: scale(30),
  },
  servicesText: {
    //textAlign: "center",
    //marginTop: 40,
    fontSize: ratioedSize(scale(16),scale(26)),
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
    fontSize: ratioedSize(scale(14),scale(20)),
    marginBottom: scale(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    width: "45%",
    height: scale(40),
    borderRadius: scale(20),
    //marginLeft: -scale(125),
    color: "#2AACAC",
  },
});
