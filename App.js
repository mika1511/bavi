import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CreateAccScreen } from "./signup_screen.js";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { OtpScreen } from "./otp_page";
import { MainScreen } from "./main_screen";
import { LoginScreen } from "./login_screen";
import { HomeScreen } from "./home_screen";
import { HomecareScreen } from "./homecare";
import { AmbulanceScreen } from "./ambulance_screen";
import { DiagnosticScreen } from "./diagnostic_screen";
import { SettingsPage } from "./settings_page.js";
import { Doctor1 } from "./Doctor1.js";
import { Nurse1 } from "./Nurse1.js";
import { Attender1 } from "./Attender1.js";
import { Physiotherapy1 } from "./Physiotherapy1.js";
import { Dietfood1 } from "./Dietfood1.js";
import { BLS } from "./BLS.js";
import { ALS } from "./ALS.js";
import { NBB } from "./NBB.js";
import { WithO2Support } from "./WithO2Support.js";
import { LabClinic } from "./LabClinic.js";
import { Radiology } from "./radiology_screen.js";
import { CareerOption } from "./CareerOptions.js";
import { EditProfile } from "./EditProfile.js";
import { EquipmentsScreen } from "./Equipments.js";
import { O2Screen } from "./O2Screen.js";
import { MonitorScreen } from "./MonitorPara.js";
import { MachineScreen } from "./Machines.js";
import { BedScreen } from "./Beds.js";
import { PaymentScreen } from "./PaymentPage.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={MainScreen}
        />
        <Stack.Screen
          name="CreateAcc"
          options={{
            headerShown: false,
          }}
          component={CreateAccScreen}
        />
        <Stack.Screen
          name="Otp"
          options={{
            headerShown: false,
          }}
          component={OtpScreen}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Homecare"
          options={{
            headerShown: false,
          }}
          component={HomecareScreen}
        />
        <Stack.Screen
          name="Ambulance"
          options={{
            headerShown: false,
          }}
          component={AmbulanceScreen}
        />
        <Stack.Screen
          name="Diagnostic"
          options={{
            headerShown: false,
          }}
          component={DiagnosticScreen}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerShown: false,
          }}
          component={SettingsPage}
        />

        <Stack.Screen
          name="Doctor1"
          options={{
            headerShown: false,
          }}
          component={Doctor1}
        />

        <Stack.Screen
          name="Nurse1"
          options={{
            headerShown: false,
          }}
          component={Nurse1}
        />
        <Stack.Screen
          name="Attender1"
          options={{
            headerShown: false,
          }}
          component={Attender1}
        />
        <Stack.Screen
          name="Physiotherapy1"
          options={{
            headerShown: false,
          }}
          component={Physiotherapy1}
        />
        <Stack.Screen
          name="Dietfood1"
          options={{
            headerShown: false,
          }}
          component={Dietfood1}
        />
        <Stack.Screen
          name="BLS"
          options={{
            headerShown: false,
          }}
          component={BLS}
        />
        <Stack.Screen
          name="ALS"
          options={{
            headerShown: false,
          }}
          component={ALS}
        />
        <Stack.Screen
          name="NBB"
          options={{
            headerShown: false,
          }}
          component={NBB}
        />
        <Stack.Screen
          name="WithO2Support"
          options={{
            headerShown: false,
          }}
          component={WithO2Support}
        />
        <Stack.Screen
          name="lab_clinic"
          options={{
            headerShown: false,
          }}
          component={LabClinic}
        />
        <Stack.Screen
          name="radiology"
          options={{
            headerShown: false,
          }}
          component={Radiology}
        />
        <Stack.Screen
          name="careerOption"
          options={{
            headerShown: false,
          }}
          component={CareerOption}
        />
         <Stack.Screen
          name="editProfile"
          options={{
            headerShown: false,
          }}
          component={EditProfile}
        />
        <Stack.Screen
          name="equipmentsScreen"
          options={{
            headerShown: false,
          }}
          component={EquipmentsScreen}
        />
        <Stack.Screen
          name="o2Screen"
          options={{
            headerShown: false,
          }}
          component={O2Screen}
        />
        <Stack.Screen
          name="bedScreen"
          options={{
            headerShown: false,
          }}
          component={BedScreen}
        />
        <Stack.Screen
          name="monitorScreen"
          options={{
            headerShown: false,
          }}
          component={MonitorScreen}
        />
        <Stack.Screen
          name="machineScreen"
          options={{
            headerShown: false,
          }}
          component={MachineScreen}
        />

<Stack.Screen
          name="paymentScreen"
          options={{
            headerShown: false,
          }}
          component={PaymentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
