import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Paper,
  IconButton,
} from "@mui/material";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import React, { useState } from "react";
import { Player } from "../validation/schemas/playerSchema";
const PlayersTable = ({
  players,
  champions,
  removePlayer,
}: {
  players: Player[];
  champions: Player[];
  removePlayer: (player: Player) => void;
}) => {
  const [orderBy, setOrderBy] = useState<keyof Player | "champion">("age");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (property: keyof Player | "champion") => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
  return (
    <>
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
                    champion.age === player.age &&
                    champion.score === player.score
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
    </>
  );
};
export default PlayersTable;
