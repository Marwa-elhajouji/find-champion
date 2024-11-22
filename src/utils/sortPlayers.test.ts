import { Player } from "../validation/schemas/playerSchema";
import { sortPlayers } from "./sortPlayers";

describe("sortPlayers", () => {
  const players: Player[] = [
    { age: 25, score: 100 },
    { age: 30, score: 150 },
    { age: 20, score: 120 },
    { age: 30, score: 120 },
  ];

  const champions: Player[] = [
    { age: 30, score: 150 },
    { age: 20, score: 120 },
  ];

  test("sorts by age ascending", () => {
    const result = sortPlayers(players, champions, "age", "asc");
    expect(result).toEqual([
      { age: 20, score: 120 },
      { age: 25, score: 100 },
      { age: 30, score: 120 },
      { age: 30, score: 150 },
    ]);
  });

  test("sorts by age descending", () => {
    const result = sortPlayers(players, champions, "age", "desc");
    expect(result).toEqual([
      { age: 30, score: 120 },
      { age: 30, score: 150 },
      { age: 25, score: 100 },
      { age: 20, score: 120 },
    ]);
  });

  test("sorts by score ascending", () => {
    const result = sortPlayers(players, champions, "score", "asc");
    expect(result).toEqual([
      { age: 25, score: 100 },
      { age: 30, score: 120 },
      { age: 20, score: 120 },
      { age: 30, score: 150 },
    ]);
  });

  test("sorts by score descending", () => {
    const result = sortPlayers(players, champions, "score", "desc");
    expect(result).toEqual([
      { age: 30, score: 150 },
      { age: 30, score: 120 },
      { age: 20, score: 120 },
      { age: 25, score: 100 },
    ]);
  });

  test("handles empty list", () => {
    const result = sortPlayers([], champions, "age", "asc");
    expect(result).toEqual([]);
  });

  test("handles single player", () => {
    const singlePlayer = [{ age: 25, score: 100 }];
    const result = sortPlayers(singlePlayer, champions, "score", "asc");
    expect(result).toEqual([{ age: 25, score: 100 }]);
  });
});
