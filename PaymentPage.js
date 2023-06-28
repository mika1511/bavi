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
//import Gpay from "./assets/google-pay-icon.svg";
//import Phonepe from "./assets/phonepe-logo-icon.svg";
import PayIcon from "./assets/pay-icon.svg";
import CashIcon from "./assets/cash-icon.svg";
import { Alert } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useFonts } from "expo-font";
import { useState } from "react";

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

const getFirstName = async (phoneNo) => {
  try {
    const response = await axios.get(
      backendIP + `/get_user_details/first_name`,
      {
        params: {
          phone_no: phoneNo,
        },
      }
    );
    return response.data["m_response"];
  } catch (error) {}
};

const createContactOption = () => {
  Alert.alert(
    "Thank you for choosing the 'Payment By Cash' option ",
    "Our Personnel will collect the cash from you",
    [
      {
        text: "OK",
        // onPress: () => Navigation.navigate("HomeScreen"),
      },
    ]
  );
};

const createAlertForService = () => {
  Alert.alert(
    "Invalid Information",
    "Please select any type of service first",
    [
      {
        text: "OK",
        // onPress: () => Navigation.navigate("HomeScreen"),
      },
    ]
  );
};

const createOrder = async (servicesName, price, phoneNo, payMe, optionS) => {
  try {
    const firstName = await getFirstName(phoneNo);
    const response = await axios.post(backendIP + "/create_order", {
      FirstName: firstName,
      ServiceName: servicesName,
      TotalPrice: price + 60,
      PhoneNumber: phoneNo,
      Pending: true,
      PaymentOption: payMe,
      OrderType: optionS,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { FlatList } from "react-native";
import { SectionList } from "react-native";
export function PaymentScreen() {
  const services = [];
  const price_array = [];
  const [servicesString, setServicesString] = React.useState(null);
  const [mTotal, setTotal] = React.useState(0);
  const [mPhone, setPhone] = React.useState(null);
  const [mSection, setSection] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem("current_service").then((value) => {
      const cur_data = JSON.parse(value);
      let total_price = 0;
      for (var i = 0; i < cur_data.length; i++) {
        services.push(cur_data[i].name);
        price_array.push(cur_data[i].price);
        total_price += cur_data[i].price;
      }
      console.log(total_price);
      setTotal(total_price);
      setServicesString(services.toString());
      AsyncStorage.getItem("PhoneNumber").then((value) => {
        setPhone(value);
      });

      const sections = [
        {
          title: "Services",
          data: services.map((service, index) => ({
            id: index + 1,
            serviceName: service,
            price: price_array[index],
          })),
        },
      ];
      setSection(sections);
    });
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View
          style={[
            styles.servicesContainer,
            {
              marginTop: scale(50),
            },
          ]}
        >
          <View style={{}}>
            <Text
              style={{
                marginRight: scale(140),
                marginBottom: scale(10),
                fontSize: getFontSize(20),
                fontWeight: "bold",
              }}
            >
              Services Details
            </Text>
          </View>

          <SectionList
            sections={mSection}
            renderSectionHeader={({ section }) => <View></View>}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.services_box1,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: scale(50),
                  },
                ]}
              >
                <Text
                  style={{
                    marginTop: scale(10),
                    marginLeft: scale(3),
                    fontWeight: "bold",
                  }}
                >{`${index + 1}.`}</Text>
                <Text
                  style={{ maxWidth: "60%", fontWeight: "bold" }}
                  adjustsFontSizeToFit
                >
                  {item.serviceName}
                </Text>
                <Text
                  style={{
                    marginTop: scale(10),
                    marginLeft: scale(3),
                    fontWeight: "bold",
                  }}
                >{`₹${item.price}`}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          <Text
            style={{
              fontWeight: "100",
              fontSize: getFontSize(18),
              color: "#323639",
            }}
          >
            {"BILL SUMMARY\n"}
          </Text>
          <View
            style={{
              minWidth: "80%",
              maxWidth: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 2,
              borderColor: "#2AACAC",
              borderRadius: scale(15),
              borderTopWidth: scale(4),
              borderLeftWidth: scale(0),
              borderBottomWidth: scale(4),
              borderRightWidth: scale(0),
              height: scale(115),
              textAlignVertical: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getFontSize(22),
                color: "#45484D",
              }}
            >
              {" Subtotal Price:\n"}
              <Text
                style={{
                  fontSize: getFontSize(20),
                }}
              >
                {" "}
                ⓘ Additional Charges:
              </Text>
              {"\n\n Grand Total:"}
            </Text>
            <Text
              style={{
                fontWeight: "600",
                fontSize: getFontSize(22),
                color: "#595e6c",
              }}
            >
              ₹{mTotal}
              {"\n"}
              <Text
                style={{
                  fontSize: getFontSize(20),
                }}
              >
                ₹60
              </Text>
              {"\n\n₹"}
              {mTotal + 60}{" "}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "100",
              fontSize: getFontSize(18),
              color: "#323639",
            }}
          >
            {" \n\nTYPE OF SERVICE"}
          </Text>
          <View
            style={{
              marginTop: scale(19.69),
            }}
          ></View>
          <View
            style={[
              styles.optionsContainer,
              {
                flexDirection: "column",
                alignItems: "flex-start",
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === "HomeCollection" && styles.selectedOption,
                {
                  height: scale(25),
                  width: scale(25),
                  marginTop: scale(10),
                },
              ]}
              onPress={() => {
                handleOptionClick("HomeCollection");
              }}
            ></TouchableOpacity>

            <Text
              style={{
                marginTop: -scale(35),
                fontSize: getFontSize(20),
                color: "#2aacac",
              }}
              onPress={() => {
                handleOptionClick("HomeCollection");
              }}
            >
              {"\t\t\t\t\t\tHome Collection"}
            </Text>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === "GoToLab" && styles.selectedOption,
                {
                  height: scale(25),
                  width: scale(25),
                  marginBottom: scale(5),
                },
              ]}
              onPress={() => {
                handleOptionClick("GoToLab");
              }}
            ></TouchableOpacity>

            <Text
              style={[
                ,
                {
                  marginTop: -scale(40),
                  marginBottom: scale(15),
                  fontSize: getFontSize(20),
                  color: "#2aacac",
                },
              ]}
              onPress={() => {
                handleOptionClick("GoToLab");
              }}
            >
              {"\t\t\t\t\t\tGo To Lab"}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "100",
              fontSize: getFontSize(18),
              color: "#323639",
            }}
          >
            {" \nMODE OF PAYMENT\n"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (selectedOption) {
                console.log(servicesString);
                createOrder(
                  servicesString,
                  mTotal,
                  mPhone,
                  "Online",
                  selectedOption
                );
                // Linking.openURL(
                //   "upi://pay?pa=umarao16@okaxis&pn=MrKolanidiUmaMaheshwarRao&cu=INR&am=" +
                //     (mTotal + 60)
                // );
                Navigation.navigate("UPIScreen");
              } else {
                createAlertForService();
              }
            }}
            style={[styles.services_box1, styles.shadow]}
          >
            <Text
              style={[
                styles.servicesText,
                {
                  marginTop: scale(10),
                },
              ]}
            >
              {"  "}
              Pay Online{" "}
            </Text>

            <PayIcon
              style={{
                marginLeft: scale(20),
              }}
              height={scale(30)}
            ></PayIcon>
          </TouchableOpacity>

          <View
            style={{
              marginTop: scale(0),
            }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              if (selectedOption) {
                console.log(selectedOption);
                createOrder(
                  servicesString,
                  mTotal,
                  mPhone,
                  "Cash",
                  selectedOption
                );
                createContactOption();
                Navigation.navigate("HomeScreen");
              } else {
                createAlertForService();
              }
            }}
            style={[styles.services_box1, styles.shadow]}
          >
            <Text
              style={[
                styles.servicesText,
                {
                  marginTop: scale(10),
                },
              ]}
            >
              {" "}
              Pay via Cash{" "}
            </Text>

            <CashIcon
              style={{
                marginLeft: scale(35),
              }}
              height={scale(35)}
            ></CashIcon>
          </TouchableOpacity>
          <View
            style={{
              marginTop: heightD * 0.01,
            }}
          ></View>
        </View>
        <View style={{ height: scale(100) }}></View>
      </ScrollView>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          {
            
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
    fontSize: getFontSize(26),
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
  container: {
    flex: 1,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginBottom: scale(20),
    backgroundColor: "white",
    height: scale(80),
    width: "80%",
    borderRadius: scale(20),
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#2AA8AC",
    shadowOpacity: scale(50),
    shadowRadius: scale(2),
    elevation: scale(11),
  },
  optionButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    borderWidth: scale(1),
    borderColor: "black",
  },
  selectedOption: {
    backgroundColor: "#2aacac",
  },
});
