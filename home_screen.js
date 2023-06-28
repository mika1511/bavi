import { StyleSheet, Text, View, Button, TouchableOpacity, style } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import BgBox from "./assets/bg_box.svg";
import Personcircle from "./assets/person-circle.svg";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



import { SafeAreaView } from "react-native-safe-area-context";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import React from "react";
//import HomeIcon from './assets/home_icon.svg'
import { HomecareScreen } from "./homecare";
import { MainScreen } from "./main_screen";
import { Linking } from "react-native";
import ChatImage from "./assets/download.svg";
import HomeIconSvg from "./assets/home_icon.svg";
import PersonIcon from "./assets/personicon.svg";
import { SettingsPage } from "./settings_page";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { PixelRatio } from "react-native";
import { ScrollView } from "react-native";

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

export function HomeScreen() {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();
  const [searchText, setSearchText] = React.useState("");
  const [mFirstName, setFirstName] = React.useState(null);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  return (
    <>
      <SafeAreaView
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          flex:1,
          display: "flex"
        }}
      ><ScrollView>
        {/* <View
          style={{
            alignSelf: "center",
          }}
        >
          <BgBox height={ratioedSize(scale(175), scale(195))} width={ratioedSize(scale(500), scale(500))}></BgBox>
        </View> */}
        <View style={{
          width: scale(320),
          height: scale(150),
          alignSelf: "center",
          backgroundColor: "#2AA8A0",
          borderRadius: scale(18),
          marginBottom: scale(30),
        }}>
          {/* <View style={{
            width: scale(305),
            height: scale(82),
            alignSelf: "center",
            backgroundColor: "white",
            borderRadius: scale(18),
            marginTop: scale(110),
          }}></View>  */}
        </View>
           


        

        <View
          style={{
            marginTop: ratioedSize(scale(-150), scale(-160)),
            marginLeft: ratioedSize(scale(40), scale(30))
          }}
        >
          <Text adjustsFontSizeToFit
            style={{
              fontWeight: "bold",
              fontSize: getFontSize(26),
              color: "white",
            }}
          >
            {"Hello 👋"}
            {"\nWelcome To BAVI"}
          </Text>
        </View>

        <View
          style={{
            //marginLeft: scale(20),
            alignSelf: "center",
            marginTop: scale(-5),
          }}
        >
          <Text adjustsFontSizeToFit
            style={{
              //fontWeight: "bold",
              color: "white",
              fontSize: getFontSize(22),
              fontStyle: "italic",
            }}
          >
            ~Aapka jeevan pratham
          </Text>
        </View>

        <View
          style={{
            width: ratioedSize("70%", "80%"),
            alignSelf: "center",
            marginTop: ratioedSize(scale(10), scale(5)),
          }}
        >
          {/* <SearchBar
            lightTheme
            round
            placeholder="Type here..."
            onChangeText={(text) => setSearchText(text)}
            containerStyle={{
              backgroundColor: "white",
              borderRadius: scale(40),
            }}
            inputContainerStyle={{
              backgroundColor: "white",
            }}
          ></SearchBar> */}
        </View> 

        {/* <View style={{
          borderWidth: 2,
          borderRadius: scale(20),
          borderColor: "grey",
          height: scale(100),
          width:scale(320),
          alignSelf:"center",
          marginTop: scale (10),

        }}></View> */}

        

        <View
          style={{
            marginLeft: scale(20),
            marginTop: scale(50),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#2AA8A0",
              fontSize: getFontSize(26),
            }}
          >
            Services
          </Text>
        </View>   
        <View
          style={{
            marginTop: ratioedSize(scale(10), scale(20)),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate("Homecare");
            }}
            style={[
              styles.services_box,
              styles.shadow,
              {
                position: "absolute",
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getFontSize(26),
                color: "#2AA8A0",
                textAlign: "center",
                marginTop: ratioedSize(scale(10),scale(15)),
              }}
            >
              Home Care
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Navigation.navigate("Ambulance");
            }}
            style={[
              styles.services_box,
              styles.shadow,
              {
                marginTop: ratioedSize(scale(80), scale(93.55)),
                position: "relative",
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getFontSize(26),
                color: "#2AA8A0",
                textAlign: "center",
                marginTop: ratioedSize(scale(10),scale(15)),
              }}
            >
              Ambulance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Navigation.navigate("Diagnostic");
            }}
            style={[
              styles.services_box,
              styles.shadow,
              {
                marginTop: ratioedSize(scale(19), scale(25)),
                position: "relative",
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getFontSize(26),
                color: "#2AA8A0",
                textAlign: "center",
                marginTop: ratioedSize(scale(10),scale(15)),
              }}
            >
              Diagnostic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Navigation.navigate("equipmentsScreen");
            }}
            style={[
              styles.services_box,
              styles.shadow,
              {
                marginTop: ratioedSize(scale(19), scale(25)),
                position: "relative",
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getFontSize(26),
                color: "#2AA8A0",
                textAlign: "center",
                marginTop: scale(2),
              }}
              adjustsFontSizeToFit
            >
              Rent For Medical{"\n"}Equipments
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: ratioedSize(scale(15), scale(15)),
            marginLeft: "80%",
          }}
        >
          <ChatImage
            color={"#2AA8A0"}
            width={ratioedSize(scale(50),scale(50))}
            height={scale(50)}
            onPress={() => {
              Linking.openURL("https://wa.me/918871306576");
            }}
          ></ChatImage>
        </View></ScrollView>
           
        <View
          style={{
            //marginTop: ratioedSize(scale(40),scale(70)),
          }}
        >
          
          <View style={[styles.downNavigator, styles.shadow]}>
            <HomeIconSvg
              style={{
                marginLeft: "17.5%",
                marginTop: scale(13),
              }}
            />

            <View
              style={{
                justifyContent: "center",
                paddingVertical: scale(10),
              }}
              onPress={() => {
                Navigation.navigate("HomeScreen");
              }}
            >
              <PersonIcon
                width={ratioedSize(scale(27), scale(30))}
                style={{
                  marginLeft: "72.5%",
                  marginTop: ratioedSize(scale(-70), scale(-75)),
                }}
                onPress={() => {
                  Navigation.navigate("Settings");  
                }}
              />
            </View>
          </View>
        </View>
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  input_button: {
    position: "absolute",
    width: scale(275),
    borderRadius: moderateScale(30),
    height: verticalScale(50),
    marginTop: verticalScale(90),
    marginLeft: scale(50),
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
  },
  container: {
    margin: scale(15),
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: scale(320),
  },
  services_box: {
    position: "absolute",
    width: scale(300),
    height: verticalScale(60),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(40),
  },
  downNavigator: {
    position: "absolute",
    //marginTop: scale(-15),
    width: scale(295),
    height: verticalScale(45),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(30),
    justifyContent: 'space-between',
    bottom: 5, 
  },
  shadow: {
    shadowOffset: { width: scale(4), height: verticalScale(4) },
    shadowColor: "#2AA8AC",
    shadowOpacity: 50,
    shadowRadius: scale(2),
    elevation: scale(11),
  },
  // servicecont: {
  //   width: "80%",
  //   height: 100,
  //   backgroundColor: "#2AA8A0",
  //   borderRadius: 18,
  //   marginBottom: 30,
  // },
});
