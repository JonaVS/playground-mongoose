import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import { getHelloMessage } from "./controllers/helloWorldController.js";
import router from "./routes/index.js";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", getHelloMessage);
app.use('/api', router)

try {
  await mongoose.connect(process.env.MONGO_URL!);
  app.listen(PORT, () => console.log(`Playground is running on port: ${PORT}`));
} catch (error) {
  console.error(error);
}