import {
  Grid,
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Artist } from "../types/spotify";

interface Props {
  artist: Artist;
  onClick?: (id: string) => void;
}

const ArtistCard: React.FC<Props> = ({ artist, onClick }) => (
  <Grid size={3} key={artist.id}>
    <Card
      elevation={0}
      sx={{ bgcolor: "transparent", cursor: "pointer" }}
      onClick={() => console.log("Clicked artist", artist.id)}
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
        {artist.images ? (
          <img
            src={artist.images[0].url}
            alt={artist.name}
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
          {artist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {artist.genres.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default ArtistCard;
