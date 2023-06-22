import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { env } from "../../env.mjs";

type EncryptReturn = {
  encryptedString: string;
  iv: string;
};

export const encrypt = (pasteContents: string): EncryptReturn => {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(env.CIPHER_KEY), iv);
  const encrypted = Buffer.concat([
    cipher.update(pasteContents),
    cipher.final(),
  ]);

  const encryptedString = encrypted.toString("hex");
  return {
    encryptedString,
    iv: iv.toString("hex"),
  };
};

export const decrypt = (encryptedPasteContents: string, iv: string): string => {
  const objectIv = Buffer.from(iv, "hex");
  const encryptedText = Buffer.from(encryptedPasteContents, "hex");
  const decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(env.CIPHER_KEY),
    objectIv
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  const decryptedString = decrypted.toString();
  return decryptedString;
};
