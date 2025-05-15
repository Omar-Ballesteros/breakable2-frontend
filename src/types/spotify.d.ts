export interface Artist {
  id: string;
  name: string;
  genres: string[];
  followers: { total: number };
  images: { url: string }[];
  type: string;
  popularity: string;
}

export interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
  genres: string[];
  artists: { name: string; id: string }[];
  type: string;
  tracks: {
    items: Track[];
  };
}

export interface Track {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
    name: string;
  };
  artists: { name: string }[];
  type: string;
  duration_ms: number;
  popularity: number;
}

export interface SpotifyTopArtistResponse {
  items: Artist[];
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifySearchResponse {
  artists: {
    items: Artist[];
  };
  albums: {
    items: Album[];
  };
  tracks: {
    items: Track[];
  };
}
