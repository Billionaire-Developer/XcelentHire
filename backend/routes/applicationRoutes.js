const express = require("express");
const path = require("path");
const { submitApplication } = require("../controllers/applicationController");
const multer = require("multer"); // only once

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure uploads/ folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowed = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only PDF, DOC, DOCX allowed"));
  },
});

// POST route with file upload
router.post("/submit-application", upload.single("resume"), submitApplication);

module.exports = router;