import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes"
dotenv.config();
const app = express();
app.use(cors());
app.use("/api/user", userRoutes);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Test",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});