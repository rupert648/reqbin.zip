import type { NextApiRequest, NextApiResponse } from "next";

import { appRouter } from "~/server/api/root";
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

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await caller.paste.createPasteObject(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const runtime = "edge";
