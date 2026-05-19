const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();

  console.log("ESPIÃO DO BACK-END - Produtos encontrados:", products);
  
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produto removido" });
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
  res.json(product);
};

exports.addReview = async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  const { rating, comment } = req.body;
  const userName = req.user.name || req.user.email || "Usuário Anônimo"; // Assuming req.user comes from authMiddleware

  const review = {
    userName,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  
  // Update total rating average
  const totalRating = product.reviews.reduce((acc, item) => item.rating + acc, 0);
  product.rating = totalRating / product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Avaliação adicionada" });
};