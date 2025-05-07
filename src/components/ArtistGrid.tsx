import { Grid } from "@mui/material";
import React from "react";
import { Artist } from "../types/spotify";
import ArtistCard from "./ArtistCard";

interface Props {
  artists: Artist[];
}

const ArtistGrid: React.FC<Props> = ({ artists }) => (
  <Grid container spacing={2}>
    {artists.map((artist) => (
      <ArtistCard key={artist.id} artist={artist} />
    ))}
  </Grid>
);

export default ArtistGrid;
