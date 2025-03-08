import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import UserProfileScreen from "./src/screens/UserProfile/UserProfileScreen";
import OrderHistoryScreen from "./src/screens/UserProfile/OrderHistoryScreen";
import ArtworksScreen from "./src/screens/UserProfile/ArtworksScreen";
import ProfileIcon from "@/assets/svgs/ProfileIcon";
// RootLayout.tsx
import React from "react";
import ArtistRequestOrders from './src/screens/ArtistRequestOrders';
// import LoginScreen from "./src/screens/LoginScreen";
import RequestCommissionUserScreen from "./src/screens/RequestCommissionUserScreen";
import ExploreScreen from "./src/screens/ExploreScreen/ExploreScreen";
import ArtistDetailScreen from "./src/screens/ArtistDetailScreen/ArtistDetailScreen";
import WorkDetailScreen from "./src/screens/WorkDetailScreen"; // <-- lo importamos
import SearchIcon from "@/assets/svgs/SearchIcon";
import KanbanIcon from "@/assets/svgs/KanbanIconProps";
import RequestIcon from "@/assets/svgs/RequestIcon";
import KanbanScreen from "./src/screens/KanbanScreen/KanbanScreen";
import LoginScreen from "./src/screens/Authentication/LoginScreen";
import AuthenticationContextProvider from "./context/AuthContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export type RootDrawerParamList = {
  Inicio: undefined;
  Explorar: undefined;
  WorkDetail: { workId: number };
  ArtistDetail: { artistId: number };
  RequestCommission: { artistId: number };
};

export default function RootLayout() {
  return (
    <AuthenticationContextProvider>
      <Drawer.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: true,
        }}
      >
        {/* Pantalla visible en el Drawer */}
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen
          name="sign-in"
          component={LoginScreen}
          options={{
            title: 'Inicio de sesión',
            drawerIcon: ({ color, size }) => (
              <ProfileIcon size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={UserProfileStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <ProfileIcon size={size} />
            ),
          }}
        />
        {/* Pantalla visible en el Drawer */}
        <Drawer.Screen
          name="Explorar"
          component={ExploreStack}
          options={{
            drawerIcon: ({ size }) => <SearchIcon width={size} height={size} />,
          }}
        />
        <Drawer.Screen
          name="Panel de comisiones"
          component={KanbanScreen}
          options={{
            drawerIcon: ({ size }) => <KanbanIcon width={size} height={size} />,
          }}
        />
        <Drawer.Screen
          name="Pedidos"
          component={ArtistRequestOrders}
          options={{
            drawerIcon: ({ size }) => <RequestIcon width={size} height={size} />,
          }}
        />
      </Drawer.Navigator>
    </AuthenticationContextProvider>
  );
}

function UserProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={UserProfileScreen} />
      <Stack.Screen name="Historial de Pedidos" component={OrderHistoryScreen} /> 
      <Stack.Screen name="Obras Subidas" component={ArtworksScreen} />
    </Stack.Navigator>
  );
}

function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All" component={ExploreScreen} />
      <Stack.Screen name="WorkDetail" component={WorkDetailScreen} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
      <Stack.Screen name="RequestCommission" component={RequestCommissionUserScreen} />
    </Stack.Navigator>
  );
}
