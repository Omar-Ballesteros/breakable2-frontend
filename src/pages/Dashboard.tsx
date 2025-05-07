import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTopArtists } from "../components/hooks/useSpotify";
import ArtistGrid from "../components/ArtistGrid";

const Dashboard: React.FC = () => {
  const { topArtists, loading } = useTopArtists();

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Search Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "stretch" }}>
        <TextField
          fullWidth
          placeholder="Search for..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="search-type-label">Type</InputLabel>
          <Select labelId="search-type-label" id="search-type" label="Type">
            <MenuItem value="Artist">Artist</MenuItem>
            <MenuItem value="Album">Album</MenuItem>
            <MenuItem value="Song">Song</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            bgcolor: "grey.300",
            color: "text.primary",
            "&:hover": {
              bgcolor: "grey.400",
            },
            px: 3,
          }}
        >
          SEARCH
        </Button>
      </Box>

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
        </>
      )}
    </Box>
  );
};

export default Dashboard;
