import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./src/screens/HomeScreen";
// import LoginScreen from "./src/screens/LoginScreen";
import RequestCommissionUserScreen from "./src/screens/RequestCommissionUserScreen";

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
        {/* <Drawer.Screen name="Iniciar Sesión" component={LoginScreen} /> */}

        {/*TEMPORTAL!!! Cuando el artista esté implementado, link en el boton Solicitar trabajo!! */}
        <Drawer.Screen name="Solicitud Artista" component={RequestCommissionUserScreen} />
      </Drawer.Navigator>
    //</NavigationContainer>
);
}
