import { useParams } from "react-router-dom";
import {
  useArtistAlbums,
  useArtistDetails,
  useArtistTopTracks,
} from "../hooks/useSpotify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Chip,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AlbumsGrid from "../components/AlbumGrid";

function millisToMinutes(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const ArtistDetails = () => {
  const { id } = useParams();
  const { artist, loading } = useArtistDetails(id || "");
  const { tracks, loading: loadingTracks } = useArtistTopTracks(id || "");
  const { albums, loading: loadingAlbums } = useArtistAlbums(id || "");

  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
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
        <IconButton
          aria-label="back"
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bgcolor: "grey.200",
            "&:hover": {
              bgcolor: "grey.300",
            },
            width: 48,
            height: 48,
          }}
        >
          <ArrowBack />
        </IconButton>
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={200}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Song Name</TableCell>
                  <TableCell>Popularity</TableCell>
                  <TableCell>Song Length</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.map((track, index) => (
                  <TableRow key={track.id}>
                    <TableCell sx={{ py: 0.5 }}>{index + 1}</TableCell>
                    <TableCell sx={{ py: 0.5 }}>
                      <img
                        src={track.album.images[0]?.url}
                        alt={track.name}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0.5 }}>{track.name}</TableCell>
                    <TableCell sx={{ py: 0.5 }}>{track.popularity}</TableCell>
                    <TableCell sx={{ py: 0.5 }}>
                      {millisToMinutes(track.duration_ms)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Albums */}
      {loadingAlbums ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
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
