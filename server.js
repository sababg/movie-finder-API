import dotenv from "dotenv";
import express from "express";
import router from "./routes/movieRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
