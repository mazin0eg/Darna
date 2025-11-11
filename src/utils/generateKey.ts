import { randomInt } from "crypto";

export const generateKey = (blocks: number = 5, blockLen: number = 5) => {
  const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let parts: string[] = [];
  for (let i = 0; i < blocks; i++) {
    let part: string = "";
    for (let j: number = 0; j < blockLen; j++) {
      part += alphabet[Math.floor(randomInt(alphabet.length))];
    }
    parts.push(part);
  }
  return parts.join("-");
};
