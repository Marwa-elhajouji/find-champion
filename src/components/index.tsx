import React from "react";
import { Box } from "@mui/material";
import PlayersVisuals from "./PlayersVisuals";
import PlayersForm from "./PlayersForm";
import { usePlayers } from "../hooks/usePlayers";

const PlayersContent = () => {
  const {
    players,
    champions,
    generatePlayers,
    addPlayer,
    removePlayer,
    clearAllPlayers,
  } = usePlayers();

  const scatterData = [
    {
      id: "Joueurs",
      data: players
        .filter(
          (player) =>
            !champions.some(
              (champion) =>
                champion.age === player.age && champion.score === player.score
            )
        )
        .map((player) => ({ x: player.age, y: player.score })),
    },
    {
      id: "Champions",
      data: players
        .filter((player) =>
          champions.some(
            (champion) =>
              champion.age === player.age && champion.score === player.score
          )
        )
        .map((player) => ({ x: player.age, y: player.score })),
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <PlayersForm
        players={players}
        champions={champions}
        addPlayer={addPlayer}
        generatePlayers={generatePlayers}
        clearAllPlayers={clearAllPlayers}
      />
      <PlayersVisuals
        scatterData={scatterData}
        players={players}
        champions={champions}
        removePlayer={removePlayer}
      />
    </Box>
  );
};

export default PlayersContent;
