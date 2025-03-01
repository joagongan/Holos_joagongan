import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./src/screens/HomeScreen";
import ExploreScreen from "./src/screens/ExploreScreen/ExploreScreen";
import SearchIcon from "@/assets/svgs/SearchIcon";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen
        name="Explorar"
        component={ExploreScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <SearchIcon width={size} height={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
