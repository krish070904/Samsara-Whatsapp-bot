import logger from '../utils/logger.js';
import Escalation from '../models/escalation.model.js';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendAlert = async (whatsappId, transcript) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: 'support@yourcompany.com',
    subject: 'WhatsApp Escalation Requested',
    text: `User ${whatsappId} requested a live expert.\n\nConversation transcript:\n${JSON.stringify(transcript, null, 2)}`,
  };
  await transporter.sendMail(mailOptions);
};

const createEscalation = async ({ whatsappId, transcript }) => {
  await Escalation.create({ whatsappId, transcript });
  logger.info(`Escalation recorded for ${whatsappId}`);
  try {
    await sendAlert(whatsappId, transcript);
    logger.info(`Escalation email sent for ${whatsappId}`);
  } catch (err) {
    logger.error('Failed to send escalation email', err);
  }
};

export default { createEscalation };
