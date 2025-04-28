import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "./pages/dashboard";
import DistributorForm from "./pages/add_distributor";
import UpdateDistributor from "./pages/update_distributor"; // Correct import for update page
import header from "./components/header"; 
import footer from "./components/footer"; 
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import Login from "./pages/login";
import Register from "./pages/register";
import DistributorProfile from "./pages/DistributorProfile";
import LocationMap from "./pages/LocationMap";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor="green" />
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="DistributorProfile" component={DistributorProfile} />
        <Stack.Screen name="Add Distributor" component={DistributorForm} />
        <Stack.Screen name="Update Distributor" component={UpdateDistributor} />
        <Stack.Screen name="LocationMap" component={LocationMap} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="header" component={header} />
        <Stack.Screen name="footer" component={footer} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      
      
      
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}
