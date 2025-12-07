import "dotenv/config";
import express from "express";
import connectMongoDb from "./utils/db.ts";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
connectMongoDb();

app.get("/", (req, res) => {
  res.send("Hello Budgie!!!");
});

app.listen(PORT, () => {
  console.log(`Budgie Server is up and running on port:${PORT}`);
});
