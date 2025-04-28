import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
// import CommunityChat from "./pages/CommunityChat";
import PostChatScreen from "./pages/PostChatScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1b5e20" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}