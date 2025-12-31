import UserSession from '../models/userSession.model.js';
import escalationService from './escalation.service.js';
import logger from '../utils/logger.js';
import axios from 'axios';

// Import Modular Handlers
import { handleWelcome, handleMainMenu } from './whatsapp/main.handler.js';
import { handleGeneralMenu, handleWellnessSubmenus } from './whatsapp/wellness.handler.js';
import { handleTechMenu, handleTechSubmenus } from './whatsapp/tech.handler.js';
import { handleBillingMenu, handleBillingSubmenus } from './whatsapp/billing.handler.js';

const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;
const API_URL = `https://graph.facebook.com/v15.0/${PHONE_ID}/messages`;

const sendMessage = async (to, content) => {
  const body = typeof content === 'string' ? { type: 'text', text: { body: content } } : content;
  try {
    await axios.post(
      API_URL,
      { messaging_product: 'whatsapp', to, ...body },
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
  } catch (err) {
    console.error('FULL META ERROR:', JSON.stringify(err.response?.data || err.message, null, 2));
    logger.error('Meta API Error (sendMessage)', err.message);
    throw err;
  }
};

const sendTemplateMessage = async (to, templateName, languageCode = 'en_US') => {
  try {
    await axios.post(
      API_URL,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
        },
      },
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
  } catch (err) {
    console.error('FULL META ERROR (TEMPLATE):', JSON.stringify(err.response?.data || err.message, null, 2));
    logger.error('Meta API Error (sendTemplate)', err.message);
    throw err;
  }
};

const processIncoming = async (payload) => {
  const entry = payload.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];
  if (!message) return;

  const from = message.from;

  let session = await UserSession.findOne({ whatsappId: from });

  if (!session) {
    await sendTemplateMessage(from, 'samsara_welcome', 'en');
    await UserSession.create({
      whatsappId: from,
      currentState: 'WELCOME',
      history: [{ from, text: 'AUTO_WELCOME_SENT', reply: 'Template sent', timestamp: new Date() }]
    });
    return;
  }

  let text = '';

  if (message.type === 'interactive') {
    text = message.interactive.button_reply?.id || message.interactive.list_reply?.id;
  } else if (message.type === 'button') {
    text = message.button.payload || message.button.text;
  } else {
    text = message.text?.body?.trim();
  }

  if (!text) return;

  const { reply, nextState, escalation } = await whatsappServiceLogic(session, text);

  session.currentState = nextState;
  // Store a string representation for history even if reply is an object
  const replyStr = typeof reply === 'string' ? reply : JSON.stringify(reply);
  session.history.push({ from, text, reply: replyStr, timestamp: new Date() });
  await session.save();

  await sendMessage(from, reply);

  if (escalation) {
    await escalationService.createEscalation({ whatsappId: from, transcript: session.history });
  }
};

const getStats = async () => {
  const count = await UserSession.countDocuments();
  return { activeSessions: count };
};

// --- CORE LOGIC ROUTER ---
const whatsappServiceLogic = async (session, text) => {
  const lower = text.toLowerCase();

  // 1. Global Navigation (Always Active)
  // If user says 'menu' or 'get started', always reset to Main Menu
  if (lower === 'menu' || lower === 'get started' || session.currentState === 'WELCOME') {
    return handleWelcome(); // Returns MAIN_MENU state
  }

  // 2. Main Menu Selection
  if (session.currentState === 'MAIN_MENU') {
    const result = handleMainMenu(lower);
    if (result) return result;
  }

  // 3. General Wellness Menu
  if (session.currentState === 'GENERAL_MENU') {
    const result = handleGeneralMenu(lower);
    if (result) return result;
  }

  // 4. Wellness Submenus (Yoga, Workshop, Mood, Placeholders)
  if (
    session.currentState === 'YOGA_SUBMENU' ||
    session.currentState === 'WORKSHOP_SUBMENU' ||
    session.currentState === 'MOOD_TRACKER' ||
    session.currentState.endsWith('_SUBMENU') // Catch all placeholders like DOSHA_SUBMENU
  ) {
    const result = handleWellnessSubmenus(session, lower);
    if (result) return result;
  }

  // 5. Technical Support Menu
  if (session.currentState === 'TECH_MENU') {
    const result = handleTechMenu(lower);
    if (result) return result;
  }

  // 6. Tech Submenus
  if (session.currentState.startsWith('TECH_')) {
    const result = handleTechSubmenus(session, lower);
    if (result) return result;
  }

  // 7. Billing Menu
  if (session.currentState === 'BILLING_MENU') {
    const result = handleBillingMenu(lower);
    if (result) return result;
  }

  // 8. Billing Submenus
  if (session.currentState.startsWith('BILLING_')) {
    const result = handleBillingSubmenus(session, lower);
    if (result) return result;
  }

  // 9. Default Fallback
  return {
    reply: "I didn't quite understand that. 🤔\nType \"Menu\" to see available options.",
    nextState: session.currentState,
    escalation: false,
  };
};

export default {
  processIncoming,
  getStats,
  sendTemplateMessage,
};
