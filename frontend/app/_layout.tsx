import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./src/screens/HomeScreen";
import ArtistRequestOrders from './src/screens/ArtistRequestOrders';
// import LoginScreen from "./src/screens/LoginScreen";

const Drawer = createDrawerNavigator()

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
        <Drawer.Screen name="Solicitudes" component={ArtistRequestOrders} />

        {/* <Drawer.Screen name="Iniciar Sesión" component={LoginScreen} /> */}
      </Drawer.Navigator>
    //</NavigationContainer>
);
}
