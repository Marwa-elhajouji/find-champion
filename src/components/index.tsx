import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { findChampions } from "../utils/findChampions";
import { Player, PlayerSchema } from "../validation/schemas/playerSchema";
import { ZodError } from "zod";
import PlayersVisuals from "./PlayersVisuals";
import PlayersForm from "./PlayersForm";
import { validatePlayers } from "../validation/validation";
import { ScatterPlotDatum, ScatterPlotRawSerie } from "@nivo/scatterplot";

const PlayersContent = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [formErrors, setFormErrors] = useState<{
    age?: string;
    score?: string;
  }>({});

  const generatePlayers = (count: number) => {
    const newPlayers = Array.from({ length: count }, () => ({
      age: Math.floor(Math.random() * 50) + 1,
      score: Math.floor(Math.random() * 2000),
    }));
    try {
      const validPlayers = validatePlayers(newPlayers);
      setPlayers(validPlayers);
    } catch (e) {
      console.error("Erreur de validation :", e);
    }
  };

  useEffect(() => {
    generatePlayers(50);
  }, []);

  const addPlayer = (age: number, score: number) => {
    try {
      const validPlayer = PlayerSchema.parse({ age, score });
      const updatedPlayers = [...players, validPlayer];
      validatePlayers(updatedPlayers);

      setPlayers(updatedPlayers);
      setFormErrors({});
    } catch (e) {
      if (e instanceof ZodError) {
        const errors = e.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
          {}
        );
        setFormErrors(errors);
      }
    }
  };

  const removePlayer = (playerToRemove: Player) => {
    setPlayers(players.filter((player) => player !== playerToRemove));
  };

  const clearAllPlayers = () => {
    setPlayers([]);
  };

  
  const champions = findChampions(players);

  const scatterData: ScatterPlotRawSerie<ScatterPlotDatum>[] = [
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
        formErrors={formErrors}
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
