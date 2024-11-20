export interface Player {
  age: number;
  score: number;
}

export function findChampions(players: Player[]): Player[] {
  validatePlayers(players);

  if (players.length <= 1) {
    return players;
  }

  const sortedPlayers = sortPlayersByScoreAndAge(players);

  return filterChampions(sortedPlayers);
}

function validatePlayers(players: Player[]): void {
  if (!Array.isArray(players)) {
    throw new Error("Input must be an array of players");
  }

  for (const player of players) {
    if (typeof player.age !== "number" || player.age < 0) {
      throw new Error(`Invalid age for player: ${JSON.stringify(player)}`);
    }
    if (typeof player.score !== "number" || isNaN(player.score)) {
      throw new Error(`Invalid score for player: ${JSON.stringify(player)}`);
    }
  }
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
