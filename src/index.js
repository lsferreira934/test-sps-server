import "dotenv/config";
import express, { json } from "express";
import router from "./router.js";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(morgan('combined'))
app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
