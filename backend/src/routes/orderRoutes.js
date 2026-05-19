const router = require("express").Router();

const controller = require("../controllers/orderController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", auth, admin, controller.getOrders);

router.post("/", controller.createOrder);

module.exports = router;