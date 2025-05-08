export interface Artist {
  id: string;
  name: string;
  genres: string[];
  followers: { total: number };
  images: { url: string }[];
  type: string;
}

export interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
  genres: string[];
  artists: { name: string }[];
  type: string;
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
