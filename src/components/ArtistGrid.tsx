import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Artist } from "../types/spotify";
import { useNavigate } from "react-router-dom";

interface Props {
  artists: Artist[];
}

const ArtistGrid: React.FC<Props> = ({ artists }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {artists.map((artists) => (
        <Grid size={2} key={artists.id}>
          <Card elevation={0} sx={{ bgcolor: "transparent" }}>
            <CardMedia
              component="div"
              sx={{
                height: 0,
                paddingTop: "100%",
                bgcolor: "grey.600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/artist/${artists.id}`)}
            >
              {artists.images.length > 0 ? (
                <img
                  src={artists.images[0].url}
                  alt={artists.name}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                  }}
                >
                  <img
                    src="/placeholder.svg"
                    alt="Placeholder"
                    width={40}
                    height={40}
                  />
                </Box>
              )}
            </CardMedia>
            <CardContent sx={{ px: 0, pt: 1, pb: 0 }}>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  cursor: "pointer",
                  fontWeight: "medium",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate(`/artist/${artists.id}`)}
              >
                {artists.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {artists.genres
                  .slice(0, 3)
                  .map(
                    (genre) => genre.charAt(0).toUpperCase() + genre.slice(1)
                  )
                  .join(", ")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArtistGrid;
