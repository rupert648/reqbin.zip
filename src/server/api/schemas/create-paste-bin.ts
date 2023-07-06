import { z } from "zod";

export const createPasteBinSchema = z.object({
  pasteContents: z.string(),
  isEditable: z.boolean(),
  timeoutDate: z.date().optional(),
});
