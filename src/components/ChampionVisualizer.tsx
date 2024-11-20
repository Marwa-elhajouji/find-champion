import React, { useEffect, useState } from "react";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import {
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Divider,
  TableSortLabel,
  TablePagination,
  IconButton,
} from "@mui/material";
import { findChampions } from "../utils/findChampions";

interface Player {
  age: number;
  score: number;
}

const ChampionVisualizer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Player | "champion">("age");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  
  useEffect(() => {
    generatePlayers(50);
  }, []);

  const champions = findChampions(players);

  const generatePlayers = (count: number) => {
    const newPlayers = Array.from({ length: count }, () => ({
      age: Math.floor(Math.random() * 50),
      score: Math.floor(Math.random() * 2000),
    }));
    setPlayers(newPlayers);
  };

  const addPlayer = (age: number, score: number) => {
    setPlayers([...players, { age, score }]);
  };
  const removePlayer = (playerToRemove: Player) => {
    const filteredPlayers= players.filter((player) => player !== playerToRemove)
    setPlayers(filteredPlayers);
  };

  const clearAllPlayers = () => {
    setPlayers([]);
  };

  const handleSort = (property: keyof Player | "champion") => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let valueA: number | boolean;
    let valueB: number | boolean;

    if (orderBy === "champion") {
      valueA = champions.some(
        (champion) => champion.age === a.age && champion.score === a.score
      );
      valueB = champions.some(
        (champion) => champion.age === b.age && champion.score === b.score
      );
    } else {
      valueA = a[orderBy];
      valueB = b[orderBy];
    }

    return orderDirection === "asc"
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1;
  });

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <LeftMenu
        players={players}
        champions={champions}
        addPlayer={addPlayer}
        generatePlayers={generatePlayers}
        clearAllPlayers={clearAllPlayers}
      />

      <MainContent
        scatterData={scatterData}
        players={players}
        champions={champions}
        sortedPlayers={sortedPlayers}
        page={page}
        rowsPerPage={rowsPerPage}
        orderBy={orderBy}
        orderDirection={orderDirection}
        handleSort={handleSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        removePlayer={removePlayer}
      />
    </Box>
  );
};

export default ChampionVisualizer;

const LeftMenu = ({
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
}) => (
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
        const form = e.target as HTMLFormElement;
        const age = parseInt((form.elements.namedItem("age") as any).value);
        const score = parseInt((form.elements.namedItem("score") as any).value);
        addPlayer(age, score);
        form.reset();
      }}
      style={{ width: "100%", marginBottom: "20px" }}
    >
      <Stack spacing={2}>
        <TextField name="age" label="Âge" type="number" fullWidth required />
        <TextField
          name="score"
          label="Score"
          type="number"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
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

const MainContent = ({
  scatterData,
  players,
  champions,
  sortedPlayers,
  page,
  rowsPerPage,
  orderBy,
  orderDirection,
  handleSort,
  handleChangePage,
  handleChangeRowsPerPage,
  removePlayer,
}: {
  scatterData: any;
  players: Player[];
  champions: Player[];
  sortedPlayers: Player[];
  page: number;
  rowsPerPage: number;
  orderBy: keyof Player | "champion";
  orderDirection: "asc" | "desc";
  handleSort: (property: keyof Player | "champion") => void;
  handleChangePage: (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    <Typography
      variant="h6"
      align="center"
      gutterBottom
      sx={{ marginBottom: 2 }}
    >
      Graphique des joueurs et champions
    </Typography>
    <Box sx={{ height: 500, marginBottom: 4 }}>
      <ResponsiveScatterPlotCanvas
        nodeSize={
          (node) =>
            champions.some(
              (champion) =>
                champion.age === node.data.x && champion.score === node.data.y
            ) ? 15 
              : 10 
        }
        data={scatterData}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Âge",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Score",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        colors={{ scheme: "nivo" }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 130,
            itemWidth: 100,
            itemHeight: 12,
            symbolSize: 12,
          },
        ]}
      />
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === "age"}
                direction={orderDirection}
                onClick={() => handleSort("age")}
              >
                Âge
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === "score"}
                direction={orderDirection}
                onClick={() => handleSort("score")}
              >
                Score
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === "champion"}
                direction={orderDirection}
                onClick={() => handleSort("champion")}
              >
                Champion
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((player, index) => {
              const isChampion = champions.some(
                (champion) =>
                  champion.age === player.age && champion.score === player.score
              );

              return (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: isChampion
                      ? "rgba(255, 235, 59, 0.3)"
                      : "",
                  }}
                >
                  <TableCell align="center">{player.age}</TableCell>
                  <TableCell align="center">{player.score}</TableCell>
                  <TableCell align="center">
                    {isChampion ? "🏆" : "-"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => removePlayer(player)}
                      color="error"
                    >
                      x
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      component="div"
      count={players.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 20]}
      labelRowsPerPage="Lignes par page"
    />
  </Box>
);
