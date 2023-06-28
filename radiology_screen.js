import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
import serviceData from "./services_data/hospital_list.json";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { ScrollView } from "react-native";
const heightD = Dimensions.get("window").height;
const widthD = Dimensions.get("window").width;
import { Linking } from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";
import axios from "axios";
import { backendIP } from "./NetworkConfig";

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

export const CustomSearchableDropdown = ({
  serviceData,
  onServiceSelected,
}) => {
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const Navigation = useNavigation();
  const handleServiceSelection = (item) => {
    const newService = {
      id: selectedServices.length + 1,
      name: item.name,
      price: item.price,
    };
    setSelectedServices((prevSelectedServices) => [
      ...prevSelectedServices,
      newService,
    ]);
    onServiceSelected(item.name, item.price);
  };

  const handleRemoveService = (id) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.filter((service) => service.id !== id)
    );
  };

  const serviceOptions = Object.keys(serviceData);

  const filteredOptions = serviceOptions
    .filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((option, index) => ({
      id: index,
      name: option,
      price: serviceData[option],
    }));

  return (
    <View>
      <SearchableDropDown
        style={styles.input_button}
        onItemSelect={(item) => handleServiceSelection(item)}
        containerStyle={[styles.login_button, styles.shadow, {}]}
        textInputStyle={{
          marginTop: scale(250),
          fontSize: getFontSize(20),
          backgroundColor: "#2AACAC",
          borderRadius: scale(20),
          height: scale(50),
          width: scale(300),
        }}
        itemStyle={styles.input_button}
        itemTextStyle={styles.itemTextStyle}
        itemsContainerStyle={{
          //justifyContent: "center",
          marginTop: scale(220),
          height: "60%",
        }}
        items={filteredOptions}
        placeholder="    Search Here"
        placeholderTextColor="white"
        onTextChange={(text) => setSearchQuery(text)}
        resetValue={false}
        underlineColorAndroid="transparent"
      />

      <View
        style={{
          marginTop: ratioedSize(scale(20),scale(30)),
          height: 400,
        }}
      >
        <ScrollView>
          {selectedServices.map((service) => (
            <View key={service.id}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    maxWidth: "80%",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#444444",
                  }}
                >
                  {service.id}. {service.name}
                </Text>

                <Text
                  style={{
                    maxWidth: "80%",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#444444",
                  }}
                >
                  Rs {service.price}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveService(service.id)}>
                <Text
                  style={{
                    color: "#DB1A3C",
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: getFontSize(20),
              borderTopWidth: 1,
              borderColor: "grey"
            }}
          >
            Total Price: Rs.{" "}
            {selectedServices.reduce(
              (total, service) => total + service.price,
              0
            )}
          </Text>
        </ScrollView>
        <View
          style={{
            marginTop: scale(30),
            marginLeft: scale(200),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              try {
                AsyncStorage.setItem(
                  "current_service",
                  JSON.stringify(selectedServices)
                ).then(() => {
                  console.log("Data saved");
                });
                const f = AsyncStorage.getItem("current_service");
                console.log(selectedServices);

                if(selectedServices.length >=1 ) {
                  Navigation.navigate("paymentScreen");
                }
              } catch (error) {
                console.log(error);
              }
            }}
            style={{
              width: scale(60),
              borderRadius: 11,
              height: scale(40),
              backgroundColor: "#2AACAC",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: getFontSize(18),
                marginTop: scale(7),
                fontWeight: "bold",
              }}
            >
              Next{" >"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export function Radiology() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedServiceName, setSelectedServiceName] = React.useState(null);
  const [selectedServicePrice, setSelectedServicePrice] = React.useState(null);
  const handleSomething = (name, price) => {
    setSelectedServiceName(name);
    setSelectedServicePrice(price);
  };
  const serviceOptions = Object.keys(serviceData);

  const filteredOptions = serviceOptions.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: scale(0),
        }}
      >
        <Text
          style={{
            fontSize: getFontSize(26),
            color: "grey",
          }}
        >
          List of services available:-{"  "}
        </Text>
      </View>

      <View
        style={{
          marginTop: scale(-233),
        }}
      >
        <CustomSearchableDropdown
          serviceData={serviceData}
          onServiceSelected={handleSomething}
        ></CustomSearchableDropdown>
      </View>
      <View
        style={[
          styles.downNavigator,
          styles.shadows,
          {
            bottom: scale(-70),
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  input_button: {
    width: "80%",
    height: 50,
    marginTop: "0%",
    borderRadius: 69,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: "5%",
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
    marginTop: scale(0),
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
  login_button: {
    width: "30%",
    borderRadius: 11,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    //marginLeft: 135,
    alignSelf: "center",
    backgroundColor: "white",
    color: "#2AACAC",
    fontWeight: "bold",
  },
});
