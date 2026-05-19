const router = require("express").Router();

const controller = require("../controllers/productController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", controller.getProducts);

router.get("/:id", controller.getProductById);

router.post("/", auth, admin, controller.createProduct);

router.put("/:id", auth, admin, controller.updateProduct);

router.delete("/:id", auth, admin, controller.deleteProduct);

router.post("/:id/reviews", auth, controller.addReview);

module.exports = router;