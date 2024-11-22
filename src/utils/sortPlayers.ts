import { Player } from "../validation/schemas/playerSchema";

export const sortPlayers = (
  players: Player[],
  champions: Player[],
  orderBy: keyof Player | "champion",
  orderDirection: "asc" | "desc"
): Player[] => {
  return [...players].sort((a, b) => {
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
};
