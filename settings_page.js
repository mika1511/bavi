import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Eclipse from "./assets/eclipse.svg";
import PersonIcon from "./assets/personicon.svg";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import mPhoneNumber from "./signup_screen";
import SelectDropdown from "react-native-select-dropdown";
import { backendIP } from "./NetworkConfig";

const screenWidth = Dimensions.get("window").width;
 

function ratioedSize(size1, size2) {
  if (screenWidth > 400) {
    return size1;
  }
  else {
    return size2;
  }
}

export function SettingsPage({ navigation }) {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const { height, width } = Dimensions.get("window");
  const [mPhoneNo, setNo] = React.useState(null);
  const [mData, setData] = React.useState(null);
  const [mFirstName, setFirstName] = React.useState(null);
  const [mLastName, setLastName] = React.useState(null);
  const [mAddress, setAddress] = React.useState(null);
  const [mOptionGender, setOptionGender] = React.useState(null);
  const [mGender, setGender] = React.useState(null);

  const Genders = ["Male", "Female"];
  const available_options = ["Doctor", "Nurse"];

  AsyncStorage.getItem("PhoneNumber").then((PhoneTest) => {
    setNo(PhoneTest);
  });

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
      setFirstName(response.data["m_response"]);
    } catch (error) {
    }
  };
 
  const getLastName = async (phoneNo) => {
    try {
      const response = await axios.get(
        backendIP + `/get_user_details/last_name`,
        {
          params: {
            phone_no: phoneNo,
          },
        }
      );
      setLastName(response.data["m_response"]);
    } catch (error) {
    }
  };

  const getAddress = async (phoneNo) => {
    try {
      const response = await axios.get(
        backendIP + `/get_user_details/address`,
        {
          params: {
            phone_no: phoneNo,
          },
        }
      );
      setAddress(response.data["m_response"]);
    } catch (error) {
    }
  };

  const getGender = async (phoneNo) => {
    try {
      const response = await axios.get(
        backendIP + `/get_user_details/gender`,
        {
          params: {
            phone_no: phoneNo,
          },
        }
      );
      setGender(response.data["m_response"]);
    } catch (error) {
    }
  };

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const [mPendingRequest, setPendingRequest] = React.useState("");

  React.useEffect(() => {
    getFirstName(mPhoneNo);
    getLastName(mPhoneNo);
    getAddress(mPhoneNo);
    getGender(mPhoneNo);
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.absoluteContainer, { height, width }]}>
        <Eclipse />
      </View>

      <View
        style={[
          styles.innerContainer,
          {
            marginTop: ratioedSize(scale(-20),scale(-80)),
          },
        ]}
      >
        <View style={[styles.iconContainer,{
          marginTop: ratioedSize(scale(-50),scale(0)),
        }]}>
        <PersonIcon 
       
             height={ratioedSize(scale(80),scale(100))}
             width={ratioedSize(scale(80),scale(100))}
          
        />
        </View>

        <View style={[styles.titleContainer]}>
          <Text
            style={[
              styles.title,
              {
                marginLeft: -scale(80),
              },
            ]}
          >
            Personal Details
          </Text>
        </View>

        <View
          style={{
            marginTop: ratioedSize(scale(-30),scale(-20)),
          }}
        ></View>

        <View>
          <Text
            style={{
              marginLeft: scale(-125),
              fontWeight: "bold",
              color: "grey",
            }}
          >
            First Name:
          </Text>
        </View>
        <View style={[styles.input_button, styles.shadow]}>
          <Text style={styles.show_text}>{mFirstName}</Text>
        </View>

        <View
          style={{
            marginTop: scale(20),
          }}
        ></View>
        <View>
          <Text
            style={{
              marginLeft: scale(-125),
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Last Name:
          </Text>
        </View>

        <View style={[styles.input_button, styles.shadow]}>
          <Text style={styles.show_text}>{mLastName}</Text>
        </View>

        <View
          style={{
            marginTop: scale(20),
          }}
        ></View>

        <View>
          <Text
            style={{
              marginLeft: scale(-125),
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Address:
          </Text>
        </View>

        <View style={[styles.input_button, styles.shadow]}>
          <Text adjustsFontSizeToFit 
          style={styles.show_text}>{mAddress}</Text>
        </View>

        <View
          style={{
            marginTop: scale(20),
          }}
        ></View>

        <View>
          <Text
            style={{
              marginLeft: scale(-125),
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Phone No:
          </Text>
        </View>
        <View style={[styles.input_button, styles.shadow]}>
          <Text style={styles.show_text}>{mPhoneNo}</Text>
        </View>

        <View
          style={{
            marginTop: scale(20),
          }}
        ></View>

        <View>
          <Text
            style={{
              marginLeft: scale(-125),
              fontWeight: "bold",
              color: "grey",
              textShadowColor: "white",
              textShadowRadius: 10,
              textShadowOffset: { width: 0, height: 0 },
            }}
          >
            Gender:
          </Text>
        </View>
        <View style={[styles.input_button, styles.shadow]}>
          <Text style={styles.show_text}>{mGender}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginTop: ratioedSize(scale(10),scale(30)),
            }}
            onPress={() => {
              navigation.navigate("careerOption");
            }}
          >
            <Text
              style={{
                marginRight: scale(140),
                fontSize: ratioedSize(scale(12),scale(18)),
                fontWeight: "bold",
                color: "white",
              }}
            >
              Career Options
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: ratioedSize(scale(3),scale(10)),
            }}
            onPress={() => {
              navigation.navigate("editProfile");
            }}
          >
            <Text
              style={{
                marginRight: scale(80),
                fontSize: ratioedSize(scale(12),scale(18)),
                fontWeight: "bold",
                color: "white",
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: ratioedSize(scale(3),scale(10)),
            }}
            onPress={() => {
              AsyncStorage.removeItem("PhoneNumber").then(() => {
                navigation.navigate("Home");
            });
          }}
            
          >
            <Text
              style={{
                marginRight: scale(80),
                fontSize: ratioedSize(scale(12),scale(18)),
                fontWeight: "bold",
                color: "white",
              }}
            >
              Log Out 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  absoluteContainer: {
    position: "absolute",
    bottom: 0,
    transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }],
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20%",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: "5%",
    
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: "10%",
  },
  title: {
    fontSize: ratioedSize(scale(16), scale(25)),
    fontWeight: "400",
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
    shadowColor: "#2AACAC",
    shadowOpacity: 20,
    shadowRadius: 2,
    elevation: 12,
  },
  login_button: {
    width: "30%",
    borderRadius: 11,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(50),
    backgroundColor: "white",
    color: "#2AACAC",
    fontWeight: "bold",
  },
  show_text: {
    marginLeft: scale(5),
    fontSize: ratioedSize(scale(13),scale(20)),
    marginTop: scale(10),
    color: "#2AACAC",
    fontWeight: "bold",
  },
});
