import { BASE_URL } from "@/src/constants/api";
import colors from "@/src/constants/colors";
import { BaseUserDTO } from "@/src/constants/CommissionTypes";
import { useRouter } from "expo-router";
import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";

interface RequestFormProps {
  user: BaseUserDTO;
}

export default function UserPanel({ user }: RequestFormProps) {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          color: colors.contentStrong,
          marginBottom: 8,
        }}
      >
        {user.name}
      </Text>

      <Image
        source={
          user.imageProfile
            ? {
                uri: `${BASE_URL}${atob(user.imageProfile)}`,
              }
            : undefined
        }
        style={{ width: 65, height: 65, borderRadius: 100 }}
        resizeMode="cover"
      />
      <Pressable
        style={{
          backgroundColor: colors.brandPrimary,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 999,
          marginTop: 15,
        }}
        onPress={() =>
          console.log("() => router.push(`/profile/${user.username}`)")
        }
      >
        <Text
          style={{
            fontWeight: "500",
            color: "white",
            textAlign: "center",
          }}
        >
          @{user.username}
        </Text>
      </Pressable>
    </View>
  );
}
