import { findChampions } from "./findChampions";
import { Player } from "../validation/schemas/playerSchema";

describe("findChampions", () => {
  it("devrait retourner une liste vide pour une liste vide de joueurs", () => {
    expect(findChampions([])).toEqual([]);
  });

  it("devrait retourner le seul joueur comme champion", () => {
    const players: Player[] = [{ age: 25, score: 1500 }];
    expect(findChampions(players)).toEqual(players);
  });

  it("devrait retourner le joueur avec le meilleur score et le plus jeune âge comme unique champion", () => {
    const players: Player[] = [
      { age: 25, score: 1500 },
      { age: 20, score: 1800 },
    ];
    expect(findChampions(players)).toEqual([players[1]]);
  });

  it("devrait retourner tous les joueurs lorsqu'aucun joueur ne surpasse les autres", () => {
    const players: Player[] = [
      { age: 25, score: 1800 },
      { age: 20, score: 1500 },
    ];
    expect(findChampions(players).sort((a, b) => a.age - b.age)).toEqual(
      players.sort((a, b) => a.age - b.age)
    );
  });

  it("devrait gérer l'égalité sur le score", () => {
    const players: Player[] = [
      { age: 25, score: 1800 },
      { age: 20, score: 1800 },
    ];
    expect(findChampions(players)).toEqual([players[1]]);
  });

  it("devrait gérer l'égalité sur l'âge", () => {
    const players: Player[] = [
      { age: 20, score: 1500 },
      { age: 20, score: 1800 },
    ];
    expect(findChampions(players)).toEqual([players[1]]);
  });

  it("devrait gérer l'égalité sur l'âge et le score", () => {
    const players = [
      { age: 20, score: 1800 },
      { age: 20, score: 1800 },
    ];
    expect(findChampions(players)).toEqual(players);
  });

  it("devrait retourner le joueur avec le meilleur score en priorité", () => {
    const players: Player[] = [
      { age: 30, score: 1500 },
      { age: 25, score: 1600 },
      { age: 20, score: 1700 },
    ];
    expect(findChampions(players)).toEqual([players[2]]);
  });

  it("devrait uniquement conserver les joueurs qui ne sont pas surpassés", () => {
    const players = [
      { age: 30, score: 1500 },
      { age: 25, score: 1600 },
      { age: 20, score: 1550 },
    ];
    expect(findChampions(players)).toEqual([players[1], players[2]]);
  });

  it("ne devrait pas dépendre de l'ordre des joueurs", () => {
    const players: Player[] = [
      { age: 25, score: 1600 },
      { age: 30, score: 1500 },
      { age: 20, score: 1700 },
    ];
    expect(findChampions(players)).toEqual([players[2]]);
  });

  it("devrait gérer de grands ensembles de joueurs", () => {
    const players: Player[] = [];
    for (let i = 0; i < 1000; i++) {
      players.push({
        age: Math.floor(Math.random() * 50),
        score: Math.floor(Math.random() * 2000),
      });
    }
    expect(findChampions(players)).toBeDefined();
  });

  it("devrait gérer correctement une liste de 1 million de joueurs", () => {
    const players: Player[] = Array.from({ length: 1000000 }, (_, i) => ({
      age: i,
      score: 1000000 - i,
    }));
    const champions = findChampions(players);
    expect(champions.length).toBe(1);
    expect(champions[0]).toEqual({ age: 0, score: 1000000 });
  });
});
