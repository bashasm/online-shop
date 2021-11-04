import express from "express";
import cors from "cors";
import { products } from "./products.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello, world!");
});

app.get("/products", (req, res) => res.json(products));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
