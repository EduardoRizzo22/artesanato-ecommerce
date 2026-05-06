const router = require("express").Router();

const controller = require("../controllers/productController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", controller.getProducts);

router.post("/", auth, admin, controller.createProduct);

router.put("/:id", auth, admin, controller.updateProduct);

router.delete("/:id", auth, admin, controller.deleteProduct);

module.exports = router;