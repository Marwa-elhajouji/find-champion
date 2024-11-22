import { Player } from "../validation/schemas/playerSchema";

export function findChampions(players: Player[]): Player[] {
  const sortedPlayers = sortPlayersByScoreAndAge(players);

  return filterChampions(sortedPlayers);
}

function sortPlayersByScoreAndAge(players: Player[]): Player[] {
  return [...players].sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return a.age - b.age;
  });
}

function filterChampions(sortedPlayers: Player[]): Player[] {
  if (sortedPlayers.length === 0) {
    return [];
  }
  const champions: Player[] = [sortedPlayers[0]];
  let currentBestScore = sortedPlayers[0].score;
  let currentYoungestAge = sortedPlayers[0].age;

  for (let i = 1; i < sortedPlayers.length; i++) {
    const player = sortedPlayers[i];

    if (
      player.score > currentBestScore ||
      player.age < currentYoungestAge ||
      (player.score === currentBestScore && player.age === currentYoungestAge)
    ) {
      champions.push(player);
      currentBestScore = player.score;
      currentYoungestAge = player.age;
    }
  }

  return champions;
}
