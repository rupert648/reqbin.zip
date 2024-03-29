import { type TRPCError } from "@trpc/server";
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "~/server/api/root";
import { getPasteObjectSchema } from "~/server/api/schemas/get-paste-object";
import { createInnerTRPCContext } from "~/server/api/trpc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const caller = appRouter.createCaller(createInnerTRPCContext());

  try {
    const safeQuery = getPasteObjectSchema.safeParse(req.query);

    if (!safeQuery.success) {
      return res.status(400).json({ message: "Invalid paste object ID" });
    }

    const pasteObject = await caller.paste.getPasteObject(safeQuery.data);
    return res.status(200).json(pasteObject);
  } catch (error) {
    const trpcError = error as TRPCError;
    if (trpcError.code === "NOT_FOUND") {
      return res.status(404).json({ message: "Paste object not found" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
