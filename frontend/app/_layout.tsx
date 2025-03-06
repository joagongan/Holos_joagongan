import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import UserProfileScreen from "./src/screens/UserProfile/UserProfileScreen";
import OrderHistoryScreen from "./src/screens/UserProfile/OrderHistoryScreen";
import ArtworksScreen from "./src/screens/UserProfile/ArtworksScreen";
import ProfileIcon from "@/assets/svgs/ProfileIcon";
// import LoginScreen from "./src/screens/LoginScreen";

const Drawer = createDrawerNavigator()

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    // <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: true, // para poder incluir el botón burger en la cabecera
        }}
      >
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        {/* <Drawer.Screen name="Iniciar Sesión" component={LoginScreen} /> */}
        <Drawer.Screen
          name="Perfil"
          component={UserProfileStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <ProfileIcon size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    //</NavigationContainer>
  );


  function UserProfileStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Perfil" component={UserProfileScreen} />
        <Stack.Screen name="Historial de Pedidos" component={OrderHistoryScreen} /> 
        <Stack.Screen name="Obras Subidas" component={ArtworksScreen} />
      </Stack.Navigator>
    );
  }
}
