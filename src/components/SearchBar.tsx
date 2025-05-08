/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchType = "artist" | "album" | "track";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({
  query,
  onQueryChange,
  searchType,
  onSearchTypeChange,
  onSearch,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "stretch" }}>
      <TextField
        fullWidth
        placeholder="Search for..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
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
        <Select
          labelId="search-type-label"
          id="search-type"
          value={searchType}
          label="Type"
          onChange={(e: SelectChangeEvent) =>
            onSearchTypeChange(e.target.value as SearchType)
          }
        >
          <MenuItem value="artist">Artist</MenuItem>
          <MenuItem value="album">Album</MenuItem>
          <MenuItem value="track">Track</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={onSearch}
        sx={{
          bgcolor: "grey.300",
          color: "text.primary",
          "&:hover": { bgcolor: "grey.400" },
          px: 3,
        }}
      >
        SEARCH
      </Button>
    </Box>
  );
};

export default SearchBar;
