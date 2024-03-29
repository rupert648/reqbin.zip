import type { NextApiRequest, NextApiResponse } from "next";

import { appRouter } from "~/server/api/root";
import { createPasteBinSchema } from "~/server/api/schemas/create-paste-bin";
import { createInnerTRPCContext } from "~/server/api/trpc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const caller = appRouter.createCaller(createInnerTRPCContext());

  const safeBody = createPasteBinSchema.safeParse(req.body);

  if (!safeBody.success) {
    res.status(400).json({ error: "invalid input" });
    return;
  }

  try {
    const result = await caller.paste.createPasteObject(safeBody.data);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
}
