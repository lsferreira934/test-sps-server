import { JSONFilePreset } from "lowdb/node";
import path from "path";

const file = path.resolve("db.json");

const defaultData = {
  users: [
    {
      id: "dbc37e0b-8856-4802-88d0-d1c887252923",
      name: "admin",
      email: "admin@spsgroup.com.br",
      type: "admin",
      password: "1234",
      active: true,
    },
  ],
  tokens: [],
};

const db = await JSONFilePreset(file, defaultData);

async function initDB() {
  await db.read();

  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }

  if (db.data) console.log("Database on");
  else console.log("Database off");
}

await initDB();

export default db;
