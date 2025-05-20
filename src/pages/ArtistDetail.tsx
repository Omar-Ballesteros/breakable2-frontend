import { useParams } from "react-router-dom";
import {
  useArtistAlbums,
  useArtistDetails,
  useArtistTopTracks,
} from "../hooks/useSpotify";
import { Box, Typography, Chip, TableContainer, Paper } from "@mui/material";
import AlbumsGrid from "../components/AlbumGrid";
import TrackTable from "../components/TrackTable";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";

const ArtistDetails = () => {
  const { id } = useParams();
  const { artist, loading } = useArtistDetails(id || "");
  const { tracks, loading: loadingTracks } = useArtistTopTracks(id || "");
  const { albums, loading: loadingAlbums } = useArtistAlbums(id || "");

  if (loading || loadingTracks || loadingAlbums) return <Loading />;
  if (!artist) return <Typography>No artist found</Typography>;

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
      <Box sx={{ position: "relative", mb: 4, mt: 4 }}>
        {/* Artist Details */}
        <Box display="flex" alignItems="flex-start">
          <Box
            sx={{
              width: 220,
              height: 220,
              bgcolor: "grey.600",
              display: "center",
              justifyContent: "center",
              mr: 3,
            }}
          >
            <img
              src={artist.images[0]?.url || "/placeholder.svg"}
              alt={artist.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {artist.name}
            </Typography>
            <Typography variant="h5" sx={{ mb: 0.5 }}>
              Genres:
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
              {artist.genres.slice(0, 5).map((genre) => (
                <Chip key={genre} label={genre} />
              ))}
            </Box>
            <Typography variant="body1" color="text.secondary">
              Followers: {artist.followers.total.toLocaleString()}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Popularity: {artist.popularity} / 100
            </Typography>
          </Box>
        </Box>

        {/* Back Button */}
        <BackButton />
      </Box>

      {/* Popular Songs */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Popular Songs
        </Typography>
        {loadingTracks ? (
          <Loading />
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <TrackTable tracks={tracks} showImage={true} />
          </TableContainer>
        )}
      </Box>

      {/* Albums */}
      {loadingAlbums ? (
        <Loading />
      ) : albums.length > 0 ? (
        <>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Albums
            </Typography>
            <AlbumsGrid albums={albums}></AlbumsGrid>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No albums found.
        </Typography>
      )}
    </Box>
  );
};

export default ArtistDetails;
