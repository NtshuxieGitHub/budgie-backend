import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

// Create app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Budgie!!!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Budgie Server is up and running on port:${PORT}`);
});
