import axios from "axios";
import {
  Album,
  Artist,
  Track,
  SpotifySearchResponse,
  SpotifyTopArtistResponse,
} from "../types/spotify";
import { useEffect, useState } from "react";

export function useTopArtists() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return setLoading(false);

      try {
        const response = await axios.get<SpotifyTopArtistResponse>(
          "http://localhost:9090/api/me/top/artists",
          {
            params: {
              userId,
            },
            withCredentials: true,
          }
        );
        setTopArtists(response.data.items);
      } catch (error) {
        console.error("Failed to fetch top artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, []);
  return { topArtists, loading };
}

export async function searchSpotify(
  query: string,
  type: "artist" | "album" | "track"
): Promise<Artist[] | Album[] | Track[]> {
  const userId = localStorage.getItem("userId");
  const response = await axios.get<SpotifySearchResponse>(
    "http://localhost:9090/api/search",
    {
      params: { query, type: type, userId },
      withCredentials: true,
    }
  );

  if (type === "artist") return response.data.artists.items;
  if (type === "album") return response.data.albums.items;
  return response.data.tracks.items;
}
