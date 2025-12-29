import logger from '../utils/logger.js';
import whatsappService from '../services/whatsapp.service.js';
export const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    logger.info('Webhook verified');
    return res.status(200).send(challenge);
  }

  logger.warn('Webhook verification failed');
  return res.sendStatus(403);
};
export const handleWebhook = async (req, res) => {
  try {
    await whatsappService.processIncoming(req.body);
    return res.status(200).send();
  } catch (err) {
    logger.error('WhatsApp webhook error', err);
    return res.status(500).send();
  }
};
export const getStats = async (req, res) => {
  const stats = await whatsappService.getStats();
  return res.json(stats);
};

export const sendTemplate = async (req, res) => {
  try {
    const { to, templateName, languageCode } = req.body;
    if (!to || !templateName) {
      return res.status(400).send({ message: 'Missing "to" or "templateName"' });
    }
    await whatsappService.sendTemplateMessage(to, templateName, languageCode);
    return res.status(200).send({ message: 'Template sent successfully' });
  } catch (err) {
    logger.error('Failed to send template', err);
    return res.status(500).send({ message: 'Failed to send template' });
  }
};
