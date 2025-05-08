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

interface Props {
  albums: Album[];
}

const AlbumsGrid: React.FC<Props> = ({ albums }) => (
  <Grid container spacing={2}>
    {albums.map((albums) => (
      <Grid size={2} key={albums.id}>
        <Card
          elevation={0}
          sx={{ bgcolor: "transparent", cursor: "pointer" }}
          onClick={() => console.log("Clicked albums", albums.id)}
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
              sx={{ fontWeight: "medium" }}
            >
              {albums.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {albums.artists.map((a) => a.name).join(", ")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default AlbumsGrid;
