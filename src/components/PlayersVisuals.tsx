import React from "react";
import { Box, Typography } from "@mui/material";
import { Player } from "../validation/schemas/playerSchema";
import PlayersGraph from "./PlayersGraph";
import PlayersTable from "./PlayersTable";
import { ScatterPlotDatum, ScatterPlotRawSerie } from "@nivo/scatterplot";

const PlayersVisuals = ({
  scatterData,
  players,
  champions,
  removePlayer,
}: {
  scatterData: ScatterPlotRawSerie<ScatterPlotDatum>[];
  players: Player[];
  champions: Player[];
  removePlayer: (player: Player) => void;
}) => (
  <Box sx={{ flex: 1, padding: 4, overflowY: "auto" }}>
    <Typography
      variant="h4"
      align="center"
      gutterBottom
      sx={{ fontWeight: "bold", color: "primary.main" }}
    >
      Champions d'Échecs
    </Typography>
    <PlayersGraph champions={champions} data={scatterData}></PlayersGraph>
    <PlayersTable
      players={players}
      champions={champions}
      removePlayer={removePlayer}
    ></PlayersTable>
  </Box>
);

export default PlayersVisuals;
