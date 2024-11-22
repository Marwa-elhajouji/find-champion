import { Player, PlayerSchema } from "./schemas/playerSchema";

export function validatePlayers(players: unknown): Player[] {
  return PlayerSchema.array().parse(players);
}
