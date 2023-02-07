import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/api";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", cors(), router);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
