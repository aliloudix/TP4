import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// -------------------------
//  IMPORTATION DE TOUS LES SCREENS
// -------------------------
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ToDoListScreen from "./screens/ToDoListScreen";
import ToDoDetailsScreen from "./screens/ToDoDetailsScreen";
import AppBar from "./screens/AppBar";

// AuthContext
import AuthProvider, { AuthContext } from "./context/AuthContext";


// -------------------------
//  NAVIGATEURS
// -------------------------
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// -------------------------
//  STACK DES TÂCHES
// -------------------------
function TodoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Liste" component={ToDoListScreen} />
      <Stack.Screen name="Détails" component={ToDoDetailsScreen} />
    </Stack.Navigator>
  );
}

// -------------------------
//  STACK HOME (HOME + DETAILS)
// -------------------------
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Accueil" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// -------------------------
//  DRAWER PRINCIPAL
// -------------------------
function AppDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Accueil" component={HomeStack} />
      <Drawer.Screen name="Tâches" component={TodoStack} />
      <Drawer.Screen name="Paramètres" component={SettingsScreen} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

// -------------------------
//  NAVIGATION CONDITIONNELLE
// -------------------------
function RootNavigator() {
  const { user } = useContext(AuthContext);

  // si user = null → Login
  // si user ≠ null → Drawer
  return user ? <AppDrawer /> : <LoginScreen />;
}

// -------------------------
//  APP PRINCIPALE
// -------------------------
export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>

          {/* Barre personnalisée */}
          <AppBar />

          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>

        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
