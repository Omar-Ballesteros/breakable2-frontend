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
          `${import.meta.env.VITE_API_URL}/api/me/top/artists`,
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
    `${import.meta.env.VITE_API_URL}/api/search`,
    {
      params: { query, type: type, userId },
      withCredentials: true,
    }
  );

  if (type === "artist") return response.data.artists.items;
  if (type === "album") return response.data.albums.items;
  return response.data.tracks.items;
}

export function useArtistDetails(artistId: string) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || !artistId) return;

      try {
        const response = await axios.get<Artist>(
          `${import.meta.env.VITE_API_URL}/api/artists/${artistId}`,
          {
            params: { userId },
            withCredentials: true,
          }
        );
        setArtist(response.data);
      } catch (error) {
        console.error("Failed to fetch artist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [artistId]);

  return { artist, loading };
}

export function useArtistTopTracks(artistId: string) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || !artistId) return;

      try {
        const response = await axios.get<{ tracks: Track[] }>(
          `${import.meta.env.VITE_API_URL}/api/artists/${artistId}/top-tracks`,
          {
            params: { userId },
            withCredentials: true,
          }
        );
        setTracks(response.data.tracks);
      } catch (error) {
        console.error("Failed to fetch top tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, [artistId]);

  return { tracks, loading };
}

export function useArtistAlbums(artistId: string) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistAlbums = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || !artistId) return;

      try {
        const response = await axios.get<{ items: Album[] }>(
          `${import.meta.env.VITE_API_URL}/api/artists/${artistId}/albums`,
          {
            params: { userId },
            withCredentials: true,
          }
        );
        setAlbums(response.data.items);
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistAlbums();
  }, [artistId]);

  return { albums, loading };
}

export function useAlbumDetails(albumId: string) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || !albumId) return;

      try {
        const response = await axios.get<Album>(
          `${import.meta.env.VITE_API_URL}/api/albums/${albumId}`,
          {
            params: { userId },
            withCredentials: true,
          }
        );
        setAlbum(response.data);
      } catch (error) {
        console.error("Failed to fetch album:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  return { album, loading };
}
