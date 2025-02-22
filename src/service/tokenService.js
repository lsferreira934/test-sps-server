import db from "../infra/database/lowdbAdapter.js";
import { v4 as uuidv4 } from "uuid";

export const insertTokenBlacklist = async (token) => {
  await db.read();
  db.data.tokens.push({ id: uuidv4(), token });
  await db.write();
};

export const hasTokenInBlacklist = async (token) => {
  await db.read();
  return db.data.tokens.some((u) => u.token === token);
};
