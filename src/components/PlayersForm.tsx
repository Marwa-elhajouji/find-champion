import React, { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { Player } from "../validation/schemas/playerSchema";

const PlayersForm = ({
  players,
  champions,
  addPlayer,
  generatePlayers,
  clearAllPlayers,
  formErrors,
}: {
  players: Player[];
  champions: Player[];
  addPlayer: (age: number, score: number) => void;
  generatePlayers: (count: number) => void;
  clearAllPlayers: () => void;
  formErrors: { age?: string; score?: string };
}) => {
  const [age, setAge] = useState<string>("");
  const [score, setScore] = useState<string>("");

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
              setAge(e.target.value);
              if (Number(e.target.value) <= 0) {
                formErrors.age = "L'âge doit être supérieur à 0.";
              } else {
                formErrors.age = "";
              }
            }}
            error={!!formErrors.age}
            helperText={formErrors.age}
          />
          <TextField
            name="score"
            label="Score"
            type="number"
            fullWidth
            value={score}
            onChange={(e) => {
              setScore(e.target.value);
              if (Number(e.target.value) < 0) {
                formErrors.score = "Le score ne peut pas être négatif.";
              } else {
                formErrors.score = "";
              }
            }}
            required
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
