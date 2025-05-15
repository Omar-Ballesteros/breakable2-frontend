import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Album } from "../types/spotify";
import { useNavigate } from "react-router-dom";

interface Props {
  albums: Album[];
}

const AlbumsGrid: React.FC<Props> = ({ albums }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {albums.map((albums) => (
        <Grid size={2} key={albums.id}>
          <Card
            elevation={0}
            sx={{ bgcolor: "transparent", cursor: "pointer" }}
          >
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
              }}
              onClick={() => navigate(`/album/${albums.id}`)}
            >
              {albums.images.length > 0 ? (
                <img
                  src={albums.images[0].url}
                  alt={albums.name}
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
                  fontWeight: "medium",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate(`/album/${albums.id}`)}
              >
                {albums.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: "text.primary",
                    textDecoration: "underline",
                  },
                }}
              >
                {albums.artists.map((a, index) => (
                  <span
                    key={a.id}
                    onClick={() => navigate(`/artist/${a.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {a.name}
                    {index < albums.artists.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlbumsGrid;
