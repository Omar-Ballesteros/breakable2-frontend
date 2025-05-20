import { useParams } from "react-router-dom";
import { useAlbumDetails } from "../hooks/useSpotify";
import { Box, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import TrackTable from "../components/TrackTable";

const AlbumDetails = () => {
  const { id } = useParams();
  const { album, loading } = useAlbumDetails(id || "");
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (!album) return <Typography>No album found</Typography>;

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
      <Box sx={{ position: "relative", mb: 4, mt: 4 }}>
        {/* Album Details */}
        <Box display="flex" alignItems="center" gap={2} mb={4}>
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
              src={album.images[0].url}
              alt={album.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box>
            <Typography variant="h4" fontWeight="bold">
              {album.name}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => navigate(`/artist/${album.artists[0].id}`)}
            >
              {album.artists[0].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Release Date: {album.release_date}
            </Typography>
          </Box>
        </Box>
        {/* Back Button */}
        <BackButton />
      </Box>

      <Typography variant="h6" gutterBottom>
        Tracks
      </Typography>
      <Divider />
      <TrackTable tracks={album.tracks.items} showImage={false}></TrackTable>
    </Box>
  );
};

export default AlbumDetails;
