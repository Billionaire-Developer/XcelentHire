const pool = require("../config/db");

exports.submitApplication = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      location,
      current_job_title,
      years_experience,
      primary_skills,
      portfolio_url,
      preferred_work_type,
      availability,
      about,
    } = req.body;

    const resume_path = req.file ? req.file.path : null;

    const query = `
      INSERT INTO applications
      (first_name, last_name, email, phone, location,
       current_job_title, years_experience, primary_skills,
       resume_path, portfolio_url, preferred_work_type,
       availability, about)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    `;

    await pool.query(query, [
      first_name,
      last_name,
      email,
      phone,
      location,
      current_job_title,
      years_experience,
      primary_skills,
      resume_path,
      portfolio_url,
      preferred_work_type,
      availability,
      about,
    ]);

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};