require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "Vaso Artesanal",
    description: "Vaso feito à mão em cerâmica",
    price: 89.9,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86",
    category: "Decoração",
    rating: 5
  },
  {
    name: "Bolsa de Crochê",
    description: "Bolsa artesanal feminina",
    price: 120,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Moda",
    rating: 4
  },
  {
    name: "Sabonete Natural",
    description: "Sabonete artesanal vegano",
    price: 25,
    image: "https://images.unsplash.com/photo-1607006483225-0a35f7c2c0e9",
    category: "Beleza",
    rating: 5
  },
  {
    name: "Quadro em Madeira",
    description: "Arte em madeira reciclada",
    price: 150,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    category: "Decoração",
    rating: 4
  }
];

async function seed() {
  await Product.deleteMany();

  await Product.insertMany(products);

  console.log("Produtos cadastrados");

  mongoose.disconnect();
}

seed();