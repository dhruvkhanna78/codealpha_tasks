const Order = require("../models/order");

const placeOrder = async (req, res) => {
  try {
    const { productId, quantity, customerName, address } = req.body;

    if (!productId || !quantity || !customerName || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = new Order({
      productId,
      quantity,
      customerName,
      address
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Add this:
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("productId"); // Get product details too
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getAllOrders };