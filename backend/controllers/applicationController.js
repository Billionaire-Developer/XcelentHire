const supabase = require("../supabase");

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

    const file = req.file;
    let resume_path = null;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const { error } = await supabase.storage
        .from("resumes")
        .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (error) throw error;
      resume_path = fileName;
    }

    await supabase.from("applications").insert([
      {
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
      },
    ]);

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
};