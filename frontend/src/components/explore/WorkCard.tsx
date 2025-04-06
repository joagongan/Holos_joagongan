import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { BASE_URL } from "@/src/constants/api";
import ReportDropdown from "@/src/components/report/ReportDropDown";
import { Work, WorksDoneDTO } from "@/src/constants/ExploreTypes";
import { styles } from "@/src/styles/Explore.styles";


type Props = {
  work: WorksDoneDTO;
  menuVisibleId: number | null;
  setMenuVisibleId: (id: number | null) => void;
};

const WorkCard = ({ work, menuVisibleId, setMenuVisibleId }: Props) => {
  const router = useRouter();
  // const { width } = useWindowDimensions();
  // const isDesktop = width > 768;
  // const styles = isDesktop ? desktopStyles : mobileStyles;

  const isBase64Path = (base64: string): boolean => {
    try {
      const decoded = atob(base64);
      return decoded.startsWith("/images/");
    } catch (e) {
      return false;
    }
  };


  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => router.push({ pathname: "/work/[workId]", params: { workId: String(work.id) } })}
      >
        <Image
          source={{
            uri: isBase64Path(work.image)
              ? `${BASE_URL}${atob(work.image)}`
              : `data:image/jpeg;base64,${work.image}`,
          }}
          style={styles.image}
          resizeMode="cover"
          onError={() => console.log("Error cargando imagen:", work.image)}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{work.name}</Text>
          {/* <Text style={styles.artist}>by @{work.artist?.baseUser?.username ?? "Artista desconocido"} </Text> */}
          <Text style={styles.description}>{work.description}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.dropdownOverlay}>
        <ReportDropdown
          workId={work.id}
          menuVisibleId={menuVisibleId}
          setMenuVisibleId={setMenuVisibleId}
          isBigScreen={true}
        />
      </View>
    </View>
  );
};

export default WorkCard;
