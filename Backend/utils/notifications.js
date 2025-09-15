const nodemailer = require("nodemailer");

let fetchImpl = null;
if (typeof globalThis.fetch === "function") {
  fetchImpl = globalThis.fetch.bind(globalThis);
} else {
  const nodeFetch = require("node-fetch");
  fetchImpl = typeof nodeFetch === "function" ? nodeFetch : null;
}

const htmlEscapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => htmlEscapeMap[char] || char);

const parseBooleanEnv = (value) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (!normalized) {
    return undefined;
  }

  if (["1", "true", "yes", "y", "on"].includes(normalized)) {
    return true;
  }

  if (["0", "false", "no", "n", "off"].includes(normalized)) {
    return false;
  }

  return undefined;
};

let transporterCache = null;
let transporterSkipReason;
let transporterInitialized = false;

const buildTransporter = () => {
  const { SMTP_HOST, SMTP_PORT } = process.env;

  if (!SMTP_HOST || !SMTP_PORT) {
    return {
      transport: null,
      skipReason: "📬 Confirmation email skipped (SMTP_HOST/SMTP_PORT not configured).",
    };
  }

  const parsedPort = Number(SMTP_PORT);

  if (!Number.isFinite(parsedPort) || parsedPort <= 0) {
    return {
      transport: null,
      skipReason: `📬 Confirmation email skipped (invalid SMTP_PORT "${SMTP_PORT}").`,
    };
  }

  const secureOverride = parseBooleanEnv(process.env.SMTP_SECURE);

  const transportOptions = {
    host: SMTP_HOST,
    port: parsedPort,
    secure: typeof secureOverride === "boolean" ? secureOverride : parsedPort === 465,
  };

  const requireTls = parseBooleanEnv(process.env.SMTP_REQUIRE_TLS);
  if (typeof requireTls === "boolean") {
    transportOptions.requireTLS = requireTls;
  }

  const ignoreTls = parseBooleanEnv(process.env.SMTP_IGNORE_TLS);
  if (typeof ignoreTls === "boolean") {
    transportOptions.ignoreTLS = ignoreTls;
  }

  const rejectUnauthorized = parseBooleanEnv(process.env.SMTP_TLS_REJECT_UNAUTHORIZED);
  if (typeof rejectUnauthorized === "boolean") {
    transportOptions.tls = { ...(transportOptions.tls || {}), rejectUnauthorized };
  }

  const { SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_USER && SMTP_PASS) {
    transportOptions.auth = { user: SMTP_USER, pass: SMTP_PASS };
  } else if (SMTP_USER || SMTP_PASS) {
    console.warn(
      "⚠️ Both SMTP_USER and SMTP_PASS must be provided to enable SMTP authentication. Proceeding without auth."
    );
  }

  return { transport: nodemailer.createTransport(transportOptions) };
};

const getTransporterInfo = () => {
  if (!transporterInitialized) {
    const { transport, skipReason } = buildTransporter();

    transporterCache = transport || null;
    transporterSkipReason = skipReason;
    transporterInitialized = true;

    if (skipReason) {
      console.info(skipReason);
    }
  }

  return { transporter: transporterCache, skipReason: transporterSkipReason };
};

let fromAddressCache;
let fromAddressInitialized = false;

const getFromAddress = () => {
  if (!fromAddressInitialized) {
    const fallbackAddress = "no-reply@localhost";
    const baseAddress = process.env.EMAIL_FROM || process.env.SMTP_USER || fallbackAddress;

    if (!process.env.EMAIL_FROM && !process.env.SMTP_USER) {
      console.warn(
        `⚠️ EMAIL_FROM or SMTP_USER is not set. Using fallback "${fallbackAddress}" for confirmation emails.`
      );
    }

    const displayName =
      typeof process.env.EMAIL_FROM_NAME === "string"
        ? process.env.EMAIL_FROM_NAME.trim()
        : "";

    fromAddressCache = displayName ? `"${displayName}" <${baseAddress}>` : baseAddress;
    fromAddressInitialized = true;
  }

  return fromAddressCache;
};

const getMemberDisplayName = (member) => {
  const raw = typeof member.name === "string" ? member.name.trim() : "";
  return raw || "there";
};

const sendMemberConfirmationEmail = async (member) => {
  const { transporter, skipReason } = getTransporterInfo();

  if (!transporter) {
    const reason = skipReason || "📬 Confirmation email skipped (SMTP not configured).";
    console.info(`${reason} Recipient: ${member.email}`);
    return;
  }

  const from = getFromAddress();
  const displayName = getMemberDisplayName(member);
  const escapedName = escapeHtml(displayName);
  const subject = "Welcome to the Childhood Disability Network Canada";
  const text = `Hi ${displayName},\n\nThank you for joining our caregiver community. We're excited to have you with us!\n\n- The CDNC Team`;
  const html = `<p>Hi ${escapedName},</p><p>Thank you for joining our caregiver community. We're excited to have you with us!</p><p>- The CDNC Team</p>`;

  try {
    const info = await transporter.sendMail({
      to: member.email,
      from,
      subject,
      text,
      html,
    });

    const previewUrl =
      typeof nodemailer.getTestMessageUrl === "function" ? nodemailer.getTestMessageUrl(info) : null;

    if (previewUrl) {
      console.info(`📬 Confirmation email sent to ${member.email} (preview: ${previewUrl})`);
    } else {
      console.info(`📬 Confirmation email sent to ${member.email}`);
    }
  } catch (err) {
    err.message = `Confirmation email delivery failed: ${err.message}`;
    throw err;
  }
};

const trackMemberEnrollment = async (member) => {
  const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info(`📈 Member enrolled: ${member.email} (${member.role})`);
    return;
  }

  if (!fetchImpl) {
    console.warn(
      `⚠️ Analytics webhook skipped for ${member.email} (fetch API is not available in this Node.js runtime).`
    );
    return;
  }

  const response = await fetchImpl(webhookUrl, {
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

  if (!response.ok) {
    let bodyText = "";

    try {
      bodyText = await response.text();
    } catch (err) {
      bodyText = "";
    }

    throw new Error(
      `Analytics webhook responded with ${response.status} ${response.statusText || ""}${
        bodyText ? ` - ${bodyText}` : ""
      }`
    );
  }

  console.info(`📈 Enrollment event sent for ${member.email}`);
};

module.exports = {
  sendMemberConfirmationEmail,
  trackMemberEnrollment,
};
