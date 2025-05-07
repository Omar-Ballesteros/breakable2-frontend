import axios from "axios";
import { Artist, SpotifyTopArtistResponse } from "../../types/spotify";
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
