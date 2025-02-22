import { v4 as uuidv4 } from "uuid";
import db from "../infra/database/lowdbAdapter.js";

export const createUserService = async (data) => {
  await db.read();
  console.log({ id: uuidv4(), ...data, active: true });
  db.data.users.push({ id: uuidv4(), ...data, active: true });
  await db.write();
};

export const getUsersService = async () => {
  await db.read();
  const users = db.data.users;
  users.forEach((user) => user && delete user.password);
  return db.data.users;
};

export const getUserByEmailService = async (email) => {
  await db.read();
  const users = db.data.users;
  const user = users.find((u) => u.email === email);
  if (user) delete user.password;
  return user;
};

export const getUserByIdService = async (id) => {
  await db.read();
  const users = db.data.users;
  const user = users.find((u) => u.id === id);
  if (user) delete user.password;
  return user;
};

export const deleteUserService = async (id) => {
  await db.read();
  let user = db.data.users.find((u) => u.id === id);
  if (!user) return false;

  db.data.users = db.data.users.map((u) => {
    if (u.id === id) {
      return { ...u, active: false };
    }
    return { ...u };
  });

  await db.write();
  return db.data.users.find((u) => u.id === id);
};

export const updateUserService = async (id, data) => {
  await db.read();
  let user = db.data.users.find((u) => u.id === id);
  if (!user) return false;

  db.data.users = db.data.users.map((u) => {
    if (u.id === id) {
      return { ...u, ...data };
    }
    return { ...u };
  });

  await db.write();
  return db.data.users.find((u) => u.id === id);
};
