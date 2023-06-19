import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "../../../env.mjs";

export const pasteRouter = createTRPCRouter({
  createPasteObject: publicProcedure
    .input(z.object({ pasteContents: z.string(), isEditable: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      console.log(env.CIPHER_KEY);
      const iv = randomBytes(16);
      const cipher = createCipheriv(
        "aes-256-cbc",
        Buffer.from(env.CIPHER_KEY),
        iv
      );
      const encrypted = Buffer.concat([
        cipher.update(input.pasteContents),
        cipher.final(),
      ]);

      const encryptedString = encrypted.toString("hex");

      const result = await ctx.prisma.pasteObject.create({
        data: {
          pasteContents: encryptedString,
          iv: iv.toString("hex"),
          isEditable: input.isEditable,
        },
      });
      console.log(result.id);

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
      const iv = Buffer.from(pasteContents.iv, "hex");
      const cipher = createCipheriv(
        "aes-256-cbc",
        Buffer.from(env.CIPHER_KEY),
        iv
      );
      const encrypted = Buffer.concat([
        cipher.update(input.pasteContents),
        cipher.final(),
      ]);

      const encryptedString = encrypted.toString("hex");

      const result = await ctx.prisma.pasteObject.update({
        where: {
          id: input.pasteObjectId,
        },
        data: {
          pasteContents: encryptedString,
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
        throw new Error("paste object not found");
      }
      const iv = Buffer.from(pasteContents.iv, "hex");
      const encryptedText = Buffer.from(pasteContents.pasteContents, "hex");
      const decipher = createDecipheriv(
        "aes-256-cbc",
        Buffer.from(env.CIPHER_KEY),
        iv
      );
      const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
      ]);
      const decryptedString = decrypted.toString();

      return {
        pasteContents: decryptedString,
        isEditable: pasteContents.isEditable,
      };
    }),
});
