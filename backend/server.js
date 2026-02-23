require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const supabase = require("./supabase");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", applicationRoutes);

// 3️⃣ Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 4️⃣ Your Application Route
app.post("/apply", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  // Save to Supabase
  const { data, error } = await supabase
    .from("applications")
    .insert([{ first_name, last_name, email }]);

  if (error) return res.status(400).json(error);

  // Send email
  await transporter.sendMail({
    from: '"XcelentHire" <hr@xcelenthire.com>',
    to: email,
    subject: "Application Received",
    html: `
      <h2>Hello ${first_name},</h2>
      <p>Your application has been received successfully.</p>
      <p>We will review it and get back to you soon.</p>
      <br/>
      <strong>XcelentHire Team</strong>
    `
  });

  res.json({ message: "Application submitted successfully" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});