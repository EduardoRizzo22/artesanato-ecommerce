const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post("/", auth, admin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhuma imagem foi enviada" });
  }
  
  // Return the path that will be appended to the baseURL
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
