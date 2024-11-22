import React, { useState } from "react";
import {
  Button,
  Stack,
  Divider,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { Player } from "../validation/schemas/playerSchema";

const PlayersForm = ({
  players,
  champions,
  addPlayer,
  generatePlayers,
  clearAllPlayers,
}: {
  players: Player[];
  champions: Player[];
  addPlayer: (age: number, score: number) => void;
  generatePlayers: (count: number) => void;
  clearAllPlayers: () => void;
}) => {
  const [age, setAge] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    age?: string;
    score?: string;
  }>({});

  const validateField = (name: string, value: string) => {
    if (name === "age") {
      return Number(value) <= 0 ? "L'âge doit être supérieur à 0." : "";
    }
    if (name === "score") {
      return Number(value) < 0 ? "Le score ne peut pas être négatif." : "";
    }
    return "";
  };

  const isAddButtonDisabled =
    !age ||
    !score ||
    Number(age) <= 0 ||
    Number(score) < 0 ||
    !!formErrors.age ||
    !!formErrors.score;

  return (
    <Box
      sx={{
        width: "25%",
        backgroundColor: "white",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ddd",
        height: "100%",
      }}
    >
      <img
        src="src/media/chess_champions.jpg"
        alt="Chess visualization"
        style={{
          maxWidth: "100%",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const parsedAge = parseInt(age, 10);
          const parsedScore = parseInt(score, 10);
          addPlayer(parsedAge, parsedScore);
          setAge("");
          setScore("");
        }}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <Stack spacing={2}>
          <TextField
            name="age"
            label="Âge"
            type="number"
            fullWidth
            required
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              setAge(value);
              setFormErrors((prev) => ({
                ...prev,
                age: validateField("age", value),
              }));
            }}
            error={!!formErrors.age}
            helperText={formErrors.age}
          />
          <TextField
            name="score"
            label="Score"
            type="number"
            fullWidth
            required
            value={score}
            onChange={(e) => {
              const value = e.target.value;
              setScore(value);
              setFormErrors((prev) => ({
                ...prev,
                score: validateField("score", value),
              }));
            }}
            error={!!formErrors.score}
            helperText={formErrors.score}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isAddButtonDisabled}
          >
            Ajouter
          </Button>
        </Stack>
      </form>
      <Stack spacing={2} width="100%">
        <Button
          onClick={() => generatePlayers(10)}
          variant="outlined"
          color="secondary"
        >
          Générer 10 joueurs
        </Button>
        <Button
          onClick={() => generatePlayers(50)}
          variant="outlined"
          color="secondary"
        >
          Générer 50 joueurs
        </Button>
        <Button
          onClick={() => generatePlayers(100)}
          variant="outlined"
          color="secondary"
        >
          Générer 100 joueurs
        </Button>
        <Button onClick={clearAllPlayers} variant="contained" color="error">
          Tout Effacer
        </Button>
      </Stack>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1">
        Total des joueurs : {players.length}
      </Typography>
      <Typography variant="body1">
        Nombre de champions : {champions.length}
      </Typography>
    </Box>
  );
};

export default PlayersForm;
