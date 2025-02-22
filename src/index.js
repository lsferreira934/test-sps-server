import "dotenv/config";
import express, { json } from "express";
import router from "./router.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
