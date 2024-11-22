import { Player } from "./schemas/playerSchema";
import { validatePlayers } from "./validation";

interface ValidationError {
  errors: { message: string }[];
}

describe("validation tests", () => {
  it("devrait lancer une erreur pour des âges négatifs", () => {
    const players: Player[] = [
      { age: 20, score: 1800 },
      { age: -25, score: 1600 },
    ];
    try {
      validatePlayers(players);
    } catch (e) {
      const error = e as ValidationError;
      expect(error.errors[0].message).toBe(
        "Invalid age: must be greater than 0."
      );
    }
  });

  it("devrait lancer une erreur pour des scores négatifs", () => {
    const players: Player[] = [
      { age: 20, score: 1800 },
      { age: 25, score: -1800 },
    ];
    try {
      validatePlayers(players);
    } catch (e) {
      const error = e as ValidationError;
      expect(error.errors[0].message).toBe(
        "Invalid score: must be a non-negative number."
      );
    }
  });

  it("devrait lancer une erreur pour des entrées de type incorrect", () => {
    try {
      validatePlayers("not an array");
    } catch (e) {
      const error = e as ValidationError;
      expect(error.errors[0].message).toBe("Expected array, received string");
    }
  });
});
