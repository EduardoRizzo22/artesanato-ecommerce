require("express-async-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Expose uploads directory statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("API do Artesanato E-commerce rodando!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

app.use((err, req, res, next) => {
  console.error("Erro interno:", err);
  res.status(500).json({ message: "Ocorreu um erro interno no servidor", error: err.message });
});

module.exports = app;