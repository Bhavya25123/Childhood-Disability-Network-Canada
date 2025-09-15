const nodemailer = require("nodemailer");

const buildTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

const sendMemberConfirmationEmail = async (member) => {
  const transporter = buildTransporter();

  if (!transporter) {
    console.info(
      `📬 Confirmation email skipped for ${member.email} (SMTP not configured).`
    );
    return;
  }

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const subject = "Welcome to the Childhood Disability Network Canada";
  const text = `Hi ${member.name},\n\nThank you for joining our caregiver community. We're excited to have you with us!\n\n- The CDNC Team`;
  const html = `<p>Hi ${member.name},</p><p>Thank you for joining our caregiver community. We're excited to have you with us!</p><p>- The CDNC Team</p>`;

  await transporter.sendMail({
    to: member.email,
    from,
    subject,
    text,
    html,
  });

  console.info(`📬 Confirmation email sent to ${member.email}`);
};

const trackMemberEnrollment = async (member) => {
  const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info(`📈 Member enrolled: ${member.email} (${member.role})`);
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: "member_enrolled",
      memberId: member._id,
      email: member.email,
      role: member.role,
      timestamp: new Date().toISOString(),
    }),
  });

  console.info(`📈 Enrollment event sent for ${member.email}`);
};

module.exports = {
  sendMemberConfirmationEmail,
  trackMemberEnrollment,
};
