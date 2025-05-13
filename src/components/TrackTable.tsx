import React from "react";
import { Track } from "../types/spotify";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface Props {
  tracks: Track[];
}

function millisToMinutes(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const TrackTable: React.FC<Props> = ({ tracks }) => {
  return (
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
  );
};

export default TrackTable;
