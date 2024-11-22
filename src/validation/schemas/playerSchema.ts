import { z } from "zod";

export const PlayerSchema = z.object({
  age: z.number().gt(0, { message: "Invalid age: must be greater than 0." }),
  score: z
    .number()
    .nonnegative({ message: "Invalid score: must be a non-negative number." }),
});

export type Player = z.infer<typeof PlayerSchema>;
