import { StatusBar } from "expo-status-bar";
// import { Dimensions } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather, Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput,
} from "react-native";

import Eclipse from "./assets/eclipse.svg";
import Logo from "./assets/Logo.svg";
import Personicon from "./assets/personicon.svg";
import { CreateAccScreen } from "./signup_screen.js";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import BgBox from "./assets/bg_box.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "./main_screen"; 
import { SearchBar } from "react-native-elements";
import { Homecarescreen } from "./homecare";




export function Homecarescreen() {
  const Tab = createBottomTabNavigator()
  
   
    
  return (
    <>
    
      <View
        style={{
          //alignContent: "center",
          flex: 5,
          flexGrow: 1,
          //alignSelf: "center",
          position: "relative",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            flex: 1,
            bottom: 0,
          }}
        >
          <BgBox />
        </View>

        <Text
          style={{
            position: "absolute",
            marginTop: 20,
            marginLeft: 50,
            //alignSelf: "center",
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {"Hello\nWelcome to BAVI"}
        </Text>

        <View
          style={{
            flex: 1,
            alignContent: "center",
            marginTop: -700,
          }}
        >
          
          <View style={{
            width: "80%",
            alignSelf: "center",
            marginTop: 110,
            
          }}>
          <SearchBar  
          placeholder="Search"
          lightTheme 
          //onChangeText={this.updateSearch}
          //value={search}
          
          ></SearchBar></View>
          <Text
          style={{
            position: "absolute",
            marginTop: 210,
            marginLeft: 30,
            //alignSelf: "center",
            color: "#2AA8A0",
            fontSize: 20,
            fontWeight: "bold",
          }}
          >
          
    
           { "Services "}
          </Text>

          <View>
            <TouchableOpacity
            onPress={() => {
              Navigation.navigate("homecare");
            }}
              style={[
                styles.services_box,styles.shadow,
                {
                  position: "absolute",
                  marginTop: -240,
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 26,
                  fontWeight : "bold",
                  color : "#2AA8A0"
                }}
              >
                Home Care 
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.services_box,styles.shadow,
                {
                  position: "relative",
                  marginTop: -120,
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 26,
                  fontWeight: "bold",

                  color : "#2AA8A0",
                  
                  
                }}
              >
                Ambulance 24x7
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.services_box,styles.shadow,
                {
                  position: "relative",
                  marginTop: 60,
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 26,
                  fontWeight: "bold",
                  color : "#2AA8A0"

                }}
              >
                Diagnostics
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
      
    </>
    
  );
              
              
              
}

const styles = StyleSheet.create({
  input_button: {
    position: "absolute",
    width: "75%",
    borderRadius : 30,
    height: 50,
    marginTop: 90,
    marginLeft: 50,
    
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
  },
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  services_box: {
    position: "absolute",
    width: 300,
    height: 60,
    left: 31,
    top: 321,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
  },
  shadow: {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#2AA8AC",
    shadowOpacity: 50,
    shadowRadius: 2,
    elevation: 11,
  },
});
