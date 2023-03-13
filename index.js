import "dotenv/config";
import connectDB from "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/v1/auth", authRouter);

//ej: carpeta public
app.use(express.static('public'))

app.get("*", (req, res) => {
  res.send("Página no encontrada");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

