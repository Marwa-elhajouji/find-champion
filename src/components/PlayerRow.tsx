import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Player } from "../validation/schemas/playerSchema";

const PlayerRow = ({
  player,
  isChampion,
  removePlayer,
}: {
  player: Player;
  isChampion: boolean;
  removePlayer: (player: Player) => void;
}) => (
  <TableRow
    sx={{
      backgroundColor: isChampion ? "rgba(255, 235, 59, 0.3)" : "",
    }}
  >
    <TableCell align="center">{player.age}</TableCell>
    <TableCell align="center">{player.score}</TableCell>
    <TableCell align="center">{isChampion ? "🏆" : "-"}</TableCell>
    <TableCell align="center">
      <IconButton onClick={() => removePlayer(player)} color="error">
        x
      </IconButton>
    </TableCell>
  </TableRow>
);

export default PlayerRow;
