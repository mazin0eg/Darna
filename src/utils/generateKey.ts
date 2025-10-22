import { randomInt } from "crypto";

export const generateKey = (blocks = 5, blockLen = 5) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let parts = [];
  for (let i = 0; i < blocks; i++) {
    let part = "";
    for (let j = 0; j < blockLen; j++) {
      part += alphabet[Math.floor(randomInt(alphabet.length))];
    }
    parts.push(part);
  }
  return parts.join("-");
};
