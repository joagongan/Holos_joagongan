import { Drawer } from "expo-router/drawer";
import ProfileIcon from "@/assets/svgs/ProfileIcon";
import SearchIcon from "@/assets/svgs/SearchIcon";
import KanbanIcon from "@/assets/svgs/KanbanIconProps";
import RequestIcon from "@/assets/svgs/RequestIcon";
import { useAuth } from "@/src/hooks/useAuth";
import { Suspense } from "react";
import LoadingScreen from "@/src/components/LoadingScreen";

export default function DrawerLayout() {
  const { isAuthenticated, isArtist, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Drawer key={isArtist ? "artist" : "client"} initialRouteName="index" screenOptions={{ headerShown: true, drawerItemStyle: { display: 'none', height: 0 } }}>
        <Drawer.Screen name="index" options={{ drawerLabel: "Inicio", drawerItemStyle: { display: 'flex', height: 'auto' } }} />
        <Drawer.Screen name="profile/index" options={{ drawerLabel: "Perfil", drawerIcon: ProfileIcon, drawerItemStyle: { display: isAuthenticated? 'flex':'none', height: 'auto' } }} />
        <Drawer.Screen name="login" options={{ drawerLabel: "Inicio de sesión", drawerIcon: ProfileIcon, drawerItemStyle: { display: isAuthenticated?'none':'flex', height: 'auto' } }} />
        <Drawer.Screen name="signup" options={{ drawerLabel: "Registrar", drawerIcon: ProfileIcon, drawerItemStyle: { display: isAuthenticated?'none':'flex', height: 'auto' } }} />
        <Drawer.Screen name="explore/index" options={{ drawerLabel: "Explorar", drawerIcon: SearchIcon, drawerItemStyle: { display: 'flex', height: 'auto' } }} />
        <Drawer.Screen name="commission/kanban" options={{ drawerLabel: "Panel de comisiones",title: "🎨 Mis encargos", drawerIcon: KanbanIcon, drawerItemStyle: { display: isArtist ? 'flex' : 'none', height: isArtist ? 'auto' : 0 } }} />
        <Drawer.Screen name="commission/index" options={{ drawerLabel: "Pedidos", drawerIcon: RequestIcon, drawerItemStyle: { display: isArtist ? 'flex' : 'none', height: isArtist ? 'auto' : 0 } }} />
        <Drawer.Screen name="logout" options={{ drawerLabel: "Cerrar sesión", drawerIcon: ProfileIcon, drawerItemStyle: { display: isAuthenticated ? 'flex' : 'none', height: isAuthenticated ? 'auto' : 0 } }} />
      </Drawer>
    </Suspense>
  );
}
