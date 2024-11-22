import { useState, useEffect } from "react";
import { findChampions } from "../utils/findChampions";
import { Player, PlayerSchema } from "../validation/schemas/playerSchema";
import { ZodError } from "zod";
import { validatePlayers } from "../validation/validation";

export const usePlayers = (initialCount: number = 50) => {
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

  useEffect(() => {
    generatePlayers(initialCount);
  }, []);

  const champions = findChampions(players);

  return {
    players,
    formErrors,
    champions,
    generatePlayers,
    addPlayer,
    removePlayer,
    clearAllPlayers,
  };
};
