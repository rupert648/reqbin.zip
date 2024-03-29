import { z } from "zod";

export const getPasteObjectSchema = z.object({ pasteObjectId: z.string() });
