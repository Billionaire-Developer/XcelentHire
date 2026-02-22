const express = require("express");
const { submitApplication } = require("../controllers/applicationController");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Use memory storage for Render + Supabase
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowed = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only PDF, DOC, DOCX allowed"));
  },
});

router.post("/submit-application", upload.single("resume"), submitApplication);

module.exports = router;