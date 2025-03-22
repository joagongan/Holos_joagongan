import { useEffect, useState } from "react"; // Se agrega useState para manejar isMounted
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "@/src/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("ADMIN" | "ARTIST" | "CLIENT")[];
}

export default function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { isAuthenticated, isArtist, isAdmin } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Nuevo estado para controlar el montaje

  const userRole = isAdmin ? "ADMIN" : isArtist ? "ARTIST" : "CLIENT";

  useEffect(() => {
    setIsMounted(true); // Se marca como montado al renderizar por primera vez
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Se espera hasta que el componente esté montado

    if (!isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(userRole))) {
      router.replace("/"); // Se ejecuta la redirección solo cuando isMounted es true
    }
  }, [isMounted, isAuthenticated, userRole]); // Se agrega isMounted como dependencia

  if (!isMounted || !isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(userRole))) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
