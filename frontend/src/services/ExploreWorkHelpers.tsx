// src/services/ExploreWorkHelpers.ts

import { getAllWorksDoneDTO } from "@/src/services/WorksDoneApi";
import { WorksDoneDTO, Artist } from "@/src/constants/ExploreTypes";
import { BASE_URL } from "@/src/constants/api";
import { getArtistById } from "@/src/services/artistApi";
import { getMostPublicationsArtists } from "@/src/services/WorksDoneApi"; // Nuevo import

/**
 * Llama a la API y devuelve el array de WorksDoneDTO.
 */
export async function fetchWorksAndTransform(): Promise<WorksDoneDTO[]> {
  try {
    const data = await getAllWorksDoneDTO();
    return data;
  } catch (error) {
    console.error("Error fetching works done:", error);
    throw error;
  }
}

/**
 * Decodifica la cadena en base64 que representa la ruta de la imagen y construye la URL completa.
 * Si la cadena decodificada es algo como "/images/miImagen.jpg", se concatenará con BASE_URL.
 */
export function decodeImagePath(encodedPath: string): string {
  let decodedPath: string;
  if (typeof atob === "function") {
    decodedPath = atob(encodedPath);
  } else {
    // Fallback para entornos donde atob no está definido (por ejemplo, Node.js)
    decodedPath = Buffer.from(encodedPath, "base64").toString("utf-8");
  }
  return `${BASE_URL}${decodedPath}`;
}

/**
 * Interfaz mínima para representar a un artista en la sección de artistas.
 * Se ha añadido imageProfile para almacenar la imagen del artista.
 */
export interface ArtistMin {
  id: number;
  name: string;
  baseUserid?: number;
  imageProfile?: string;
}

/**
 * Obtiene los tres artistas con más publicaciones usando la nueva API.
 */
export async function getTopThreeArtists(): Promise<ArtistMin[]> {
  try {
    const artists: Artist[] = await getMostPublicationsArtists();
    // Se extraen los tres primeros artistas y se mapean al tipo ArtistMin.
    return artists.slice(0, 3).map((artist) => ({
      id: artist.id,
      // Se usa el nombre de baseUser si existe; en caso contrario, se usa artist.name
      name: artist.baseUser?.name || artist.name,
      imageProfile: artist.baseUser?.imageProfile,
      baseUserid: artist.baseUser?.id,
    }));
  } catch (error) {
    console.error("Error fetching top three artists:", error);
    throw error;
  }
}
