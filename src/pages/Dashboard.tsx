import { Box, CircularProgress, Typography } from "@mui/material";
import { searchSpotify, useTopArtists } from "../hooks/useSpotify";
import ArtistGrid from "../components/ArtistGrid";
import { useState } from "react";
import { Album, Artist, Track } from "../types/spotify";
import AlbumGrid from "../components/AlbumGrid";
import TrackGrid from "../components/TrackGrid";
import SearchBar from "../components/SearchBar";

type SearchType = "artist" | "album" | "track";

type SearchResultsState =
  | { type: "artist"; data: Artist[] }
  | { type: "album"; data: Album[] }
  | { type: "track"; data: Track[] }
  | null;

const Dashboard: React.FC = () => {
  const { topArtists, loading } = useTopArtists();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SearchType>("artist");
  const [searchResults, setSearchResults] = useState<SearchResultsState>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const results = await searchSpotify(searchQuery, selectedType);
      if (selectedType === "artist") {
        setSearchResults({ type: "artist", data: results as Artist[] });
      } else if (selectedType === "album") {
        setSearchResults({ type: "album", data: results as Album[] });
      } else if (selectedType === "track") {
        setSearchResults({ type: "track", data: results as Track[] });
      }
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const renderSearchResults = () => {
    if (!searchResults || searchResults.data.length === 0) {
      return <Typography>No results found</Typography>;
    }

    switch (searchResults.type) {
      case "artist":
        return <ArtistGrid artists={searchResults.data} />;
      case "album":
        return <AlbumGrid albums={searchResults.data} />;
      case "track":
        return <TrackGrid tracks={searchResults.data} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Search Section */}
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        searchType={selectedType}
        onSearchTypeChange={setSelectedType}
        onSearch={handleSearch}
      />
      {/* Loading Spinner */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Top Artists Section */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              MY TOP ARTISTS
            </Typography>
            <ArtistGrid artists={topArtists} />
          </Box>

          {hasSearched && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                SEARCH RESULTS
              </Typography>
              {renderSearchResults()}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Dashboard;
