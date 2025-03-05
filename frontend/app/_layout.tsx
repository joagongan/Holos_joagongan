import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./src/screens/HomeScreen";
import WorkDetailScreen from "./src/screens/WorkDetailScreen";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <Drawer.Navigator 
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true, // Muestra el header con el botón "hamburguesa"
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Obra" component={WorkDetailScreen} />
    </Drawer.Navigator>
  );
}
