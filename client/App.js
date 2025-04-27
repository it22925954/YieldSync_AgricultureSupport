import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import header from "./components/header"; 
import footer from "./components/footer"; 
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import Login from "./pages/login";
import Register from "./pages/register";
import AddBudgetScreen from './pages/AddBudgetScreen';
import FinancialDashboard from './pages/FinancialDashboard';
import AddExpenseScreen from './pages/AddExpenseScreen';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor="green" />
      <Stack.Navigator initialRouteName="FinancialDashboard">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="header" component={header} />
        <Stack.Screen name="footer" component={footer} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="FinancialDashboard" component={FinancialDashboard} />
        <Stack.Screen name="AddBudgetScreen" component={AddBudgetScreen} />
        <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}