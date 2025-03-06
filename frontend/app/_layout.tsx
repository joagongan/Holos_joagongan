// RootLayout.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./src/screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "./src/screens/ExploreScreen/ExploreScreen";
import ArtistDetailScreen from "./src/screens/ArtistDetailScreen/ArtistDetailScreen";
import WorkDetailScreen from "./src/screens/WorkDetailScreen"; // <-- lo importamos
import SearchIcon from "@/assets/svgs/SearchIcon";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export type RootDrawerParamList = {
  Inicio: undefined;
  Explorar: undefined;
  WorkDetail: { workId: number };
  ArtistDetail: { artistId: number };
};

export default function RootLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true,
      }}
    >
      {/* Pantalla visible en el Drawer */}
      <Drawer.Screen name="Inicio" component={HomeScreen} />

      {/* Pantalla visible en el Drawer */}
      <Drawer.Screen
        name="Explorar"
        component={ExploreStack}
        options={{
          drawerIcon: ({ size }) => <SearchIcon width={size} height={size} />,
        }}
      />
    </Drawer.Navigator>
  );
  function ExploreStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Explorar" component={ExploreScreen} />
        <Stack.Screen
        name="WorkDetail"
        component={WorkDetailScreen}
      />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
      </Stack.Navigator>
    );
  }
}
