const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    orderId: Math.random().toString(36).substring(2, 10)
  });

  res.json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};