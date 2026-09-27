const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

const validateStudent = (req, res, next) => {
  const { name, email, age, course } = req.body;
  const missing = [];

  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (age === undefined || age === null) missing.push("age");
  if (!course) missing.push("course");

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required field(s): ${missing.join(", ")}`,
    });
  }

  if (typeof age !== "number" || Number.isNaN(age) || age <= 0) {
    return res.status(400).json({
      success: false,
      message: "Field 'age' must be a valid positive number",
    });
  }

  next();
};

module.exports = { requestLogger, validateStudent };
