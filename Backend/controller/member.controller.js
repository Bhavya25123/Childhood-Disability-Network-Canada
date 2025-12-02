const Member = require("../Data/Member");
const { sendMemberConfirmationEmail, trackMemberEnrollment } = require("../utils/notifications");

const allowedRoles = new Set(["family", "professional", "volunteer", "seeking", "other"]);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const create = async (req, res) => {
  try {
    const { name, email, role, agreeToTerms } = req.body;
    const errors = {};

    const trimmedName = typeof name === "string" ? name.trim().replace(/\s+/g, " ") : "";
    if (!trimmedName) {
      errors.name = "Your name is required.";
    }

    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!normalizedEmail) {
      errors.email = "An email address is required.";
    } else if (!emailRegex.test(normalizedEmail)) {
      errors.email = "Enter a valid email address.";
    }

    if (!role || !allowedRoles.has(role)) {
      errors.role = "Select the option that best describes you.";
    }

    if (!agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms to join.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: "Validation failed", errors });
    }

    const existingMember = await Member.findOne({ email: normalizedEmail });
    if (existingMember) {
      return res.status(409).json({ error: "This email is already enrolled." });
    }

    const member = await Member.create({
      name: trimmedName,
      email: normalizedEmail,
      role,
      termsAcceptedAt: new Date(),
    });

    
     setImmediate(() => {
      Promise.allSettled([sendMemberConfirmationEmail(member), trackMemberEnrollment(member)])
        .then(([emailResult, analyticsResult]) => {
          if (emailResult.status === "rejected") {
            console.error("❌ Failed to send confirmation email:", emailResult.reason);
          }

    try {
     if (analyticsResult.status === "rejected") {
            console.error("❌ Failed to log analytics event:", analyticsResult.reason);
          }
        }
        .catch((err) => {
          console.error("❌ Unexpected error while processing background enrollment tasks:", err);
        });
    });

    return res.status(201).json({
      message: "Enrollment successful",
      memberId: member._id,
    });
  } catch (err) {
    console.error("❌ Member enrollment error:", err);
    return res
      .status(503)
      .json({ error: "Something went wrong while enrolling. Please try again later." });
  }
};

module.exports = { create };
