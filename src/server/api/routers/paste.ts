import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { decrypt, encrypt } from "../../utils/encrypt";
import { hasTimedOut } from "../../utils/timeout";
import { createPasteBinSchema } from "../schemas/create-paste-bin";

export const pasteRouter = createTRPCRouter({
  createPasteObject: publicProcedure
    .input(createPasteBinSchema)
    .mutation(async ({ input, ctx }) => {
      const { encryptedString, iv } = encrypt(input.pasteContents);

      const result = await ctx.prisma.pasteObject.create({
        data: {
          pasteContents: encryptedString,
          iv,
          isEditable: input.isEditable,
          hasTimeout: Boolean(input.timeoutDate),
          timeoutDate: input.timeoutDate,
        },
      });

      return { pasteObjectId: result.id };
    }),

  updatePasteObject: publicProcedure
    .input(z.object({ pasteObjectId: z.string(), pasteContents: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const pasteContents = await ctx.prisma.pasteObject.findUnique({
        where: {
          id: input.pasteObjectId,
        },
      });
      if (!pasteContents) {
        throw new Error("paste object not found");
      }
      if (!pasteContents.isEditable) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Paste bin is not editable",
        });
      }

      const { encryptedString, iv } = encrypt(input.pasteContents);

      const result = await ctx.prisma.pasteObject.update({
        where: {
          id: input.pasteObjectId,
        },
        data: {
          pasteContents: encryptedString,
          iv,
        },
      });

      return { pasteObjectId: result.id };
    }),

  getPasteObject: publicProcedure
    .input(z.object({ pasteObjectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const pasteContents = await ctx.prisma.pasteObject.findUnique({
        where: {
          id: input.pasteObjectId,
        },
      });
      if (!pasteContents) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Paste bin not found",
        });
      }

      if (pasteContents.hasTimeout && hasTimedOut(pasteContents.timeoutDate)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Paste bin not found",
        });
      }

      const decryptedString = decrypt(
        pasteContents.pasteContents,
        pasteContents.iv
      );

      return {
        pasteContents: decryptedString,
        isEditable: pasteContents.isEditable,
        ...(pasteContents.hasTimeout
          ? {
            timeoutDate: pasteContents.timeoutDate,
          }
          : {}),
      };
    }),
});
