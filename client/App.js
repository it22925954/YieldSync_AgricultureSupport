import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./pages/dashboard";
import DistributorForm from "./pages/add_distributor";
import UpdateDistributor from "./pages/update_distributor"; // Correct import for update page
import ForumScreen from "./pages/communityforum"; // Importing the forum screen
import NewPostScreen from "./pages/newpostscreen"; // Importing the new post screen
import PostDetailScreen from "./pages/postdetailscreen"; // Importing the post detail screen
import EditPostScreen from "./pages/EditPostScreen";
import AlertListScreen from "./pages/AlertListScreen";
import CreateNotice from "./pages/CreateNoticeScreen"; 
import UpdateNoticeScreen from "./pages/UpdateNoticeScreen";
import header from "./components/header"; 
import footer from "./components/footer"; 
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import Login from "./pages/login";
import Register from "./pages/register";
import DistributorProfile from "./pages/DistributorProfile";
import LocationMap from "./pages/LocationMap";
// import CommunityChat from "./pages/CommunityChat";
import PostChatScreen from "./pages/PostChatScreen";
import PostChatListScreen from "./pages/PostChatListScreen";
import AddBudgetScreen from "./pages/AddBudgetScreen";
import FinancialDashboard from "./pages/FinancialDashboard";
import AddExpenseScreen from "./pages/AddExpenseScreen";  


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <StatusBar style="auto" backgroundColor="green" />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="DistributorProfile" component={DistributorProfile} />
        <Stack.Screen name="Add Distributor" component={DistributorForm} />
        <Stack.Screen name="Update Distributor" component={UpdateDistributor} />
        <Stack.Screen name="FinancialDashboard" component={FinancialDashboard} />
        <Stack.Screen name="LocationMap" component={LocationMap} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forum" component={ForumScreen} />
        <Stack.Screen name="NewPost" component={NewPostScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="EditPost" component={EditPostScreen} />
        <Stack.Screen name="Alert" component={AlertListScreen} />
        <Stack.Screen name="AddNotice" component={CreateNotice} />
        <Stack.Screen name="EditNotice" component={UpdateNoticeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="header" component={header} />
        <Stack.Screen name="footer" component={footer} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        {/* <Stack.Screen name="CommunityChat" component={CommunityChat} /> */}
        <Stack.Screen name="PostChat" component={PostChatScreen} />
        <Stack.Screen name="ChatList" component={PostChatListScreen} />
        <Stack.Screen name="FinancialDashboard" component={FinancialDashboard} />
        <Stack.Screen name="AddBudgetScreen" component={AddBudgetScreen} />
        <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
