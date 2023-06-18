import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "../../../env.mjs";

export const curlRouter = createTRPCRouter({
  createCurl: publicProcedure
    .input(z.object({ curlRequest: z.string(), isEditable: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      console.log(env.CIPHER_KEY);
      const iv = randomBytes(16);
      const cipher = createCipheriv(
        "aes-256-cbc",
        Buffer.from(env.CIPHER_KEY),
        iv
      );
      const encrypted = Buffer.concat([
        cipher.update(input.curlRequest),
        cipher.final(),
      ]);

      const encryptedString = encrypted.toString("hex");

      const result = await ctx.prisma.curlRequest.create({
        data: {
          curlRequest: encryptedString,
          iv: iv.toString("hex"),
          isEditable: input.isEditable,
        },
      });
      console.log(result.id);

      return { curlId: result.id };
    }),

  updateCurl: publicProcedure
    .input(z.object({ curlRequestId: z.string(), curlRequest: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const curlRequest = await ctx.prisma.curlRequest.findUnique({
        where: {
          id: input.curlRequestId,
        },
      });
      if (!curlRequest) {
        throw new Error("curl request not found");
      }
      const iv = Buffer.from(curlRequest.iv, "hex");
      const cipher = createCipheriv(
        "aes-256-cbc",
        Buffer.from(env.CIPHER_KEY),
        iv
      );
      const encrypted = Buffer.concat([
        cipher.update(input.curlRequest),
        cipher.final(),
      ]);

      const encryptedString = encrypted.toString("hex");

      const result = await ctx.prisma.curlRequest.update({
        where: {
          id: input.curlRequestId,
        },
        data: {
          curlRequest: encryptedString,
        },
      });
      console.log(result.id);

      return { curlId: result.id };
    }),

  getCurl: publicProcedure
    .input(z.object({ curlRequestId: z.string() }))
    .query(async ({ input, ctx }) => {
      const curlRequest = await ctx.prisma.curlRequest.findUnique({
        where: {
          id: input.curlRequestId,
        },
      });
      if (!curlRequest) {
        throw new Error("curl request not found");
      }
      const iv = Buffer.from(curlRequest.iv, "hex");
      const encryptedText = Buffer.from(curlRequest.curlRequest, "hex");
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
      console.log(curlRequest.isEditable);
      return {
        curlRequest: decryptedString,
        isEditable: curlRequest.isEditable,
      };
    }),
});
