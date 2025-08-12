import { createHash } from "crypto";

const SALT = process.env.HASH_SALT || "oversee-noi-salt";

export function sha256(input: string) {
  return createHash("sha256").update(input + SALT).digest("hex");
}