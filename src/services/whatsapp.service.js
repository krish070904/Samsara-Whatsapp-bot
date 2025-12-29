import UserSession from '../models/userSession.model.js';
import aiService from './ai.service.js';
import escalationService from './escalation.service.js';
import axios from 'axios';
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;
const API_URL = `https://graph.facebook.com/v15.0/${PHONE_ID}/messages`;
const sendMessage = async (to, content) => {
  const body = typeof content === 'string' ? { type: 'text', text: { body: content } } : content;
  await axios.post(
    API_URL,
    { messaging_product: 'whatsapp', to, ...body },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
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
    logger.error('Meta API Error:', err.response?.data || err.message);
    throw err;
  }
};

const processIncoming = async (payload) => {
  const entry = payload.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];
  if (!message) return;

  const from = message.from;
  let text = '';

  if (message.type === 'interactive') {
    text = message.interactive.button_reply?.id || message.interactive.list_reply?.id;
  } else if (message.type === 'button') {
    text = message.button.payload || message.button.text;
  } else {
    text = message.text?.body?.trim();
  }

  if (!text) return;

  const session = await UserSession.findOneAndUpdate(
    { whatsappId: from },
    { $setOnInsert: { currentState: 'WELCOME', history: [] } },
    { upsert: true, new: true }
  );

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

const whatsappServiceLogic = async (session, text) => {
  const lower = text.toLowerCase();

  const mainMenuPayload = {
    type: 'interactive',
    interactive: {
      type: 'list',
      header: { type: 'text', text: 'Samsara Wellness 🌸' },
      body: { text: 'Namaste! How can I help you today?' },
      footer: { text: 'Select an option below' },
      action: {
        button: 'Menu Options',
        sections: [
          {
            title: 'Samsara Services',
            rows: [
              { id: '1', title: 'General Wellness', description: 'Yoga, Mood, Period Tracker' },
              { id: '2', title: 'Technical Support', description: 'App issues, Login help' },
              { id: '3', title: 'Payment & Billing', description: 'Invoices, Subscription' },
              { id: '4', title: 'Talk to Expert', description: 'Connect with a human agent' },
            ],
          },
        ],
      },
    },
  };

  if (session.currentState === 'WELCOME' || lower === 'menu' || lower === 'get started') {
    return {
      reply: mainMenuPayload,
      nextState: 'MAIN_MENU',
      escalation: false,
    };
  }

  if (session.currentState === 'MAIN_MENU') {
    if (lower === '1' || lower.includes('general')) {
      return {
        reply: {
          type: 'interactive',
          interactive: {
            type: 'list',
            header: { type: 'text', text: 'General Wellness 🧘‍♀️' },
            body: { text: 'Choose a wellness tracking category:' },
            footer: { text: 'Samsara Wellness' },
            action: {
              button: 'Select Category',
              sections: [
                {
                  title: 'Categories',
                  rows: [
                    { id: 'yoga', title: 'Yoga & Meditation' },
                    { id: 'workshops', title: 'Online Workshops' },
                    { id: 'mood', title: 'Mood Tracker' },
                    { id: 'dosha', title: 'Dosha Tracker' },
                    { id: 'health', title: 'Health Tracker' },
                    { id: 'period', title: 'Period Tracker' },
                    { id: 'pcos', title: 'PCOS / PCOD' },
                    { id: 'thyroid', title: 'Thyroid Support' },
                    { id: 'menopause', title: 'Menopause Care' },
                    { id: 'diet', title: 'Diet & Nutrition' },
                  ],
                },
              ],
            },
          },
        },
        nextState: 'GENERAL_MENU',
        escalation: false,
      };
    }
    if (lower === '2' || lower.includes('technical')) {
      return {
        reply: {
          type: 'interactive',
          interactive: {
            type: 'list',
            header: { type: 'text', text: 'Technical Support 🛠' },
            body: { text: 'Select your issue:' },
            footer: { text: 'Samsara Support' },
            action: {
              button: 'Select Issue',
              sections: [
                {
                  title: 'Topics',
                  rows: [
                    { id: 'app_issue', title: 'App not working' },
                    { id: 'device_issue', title: 'Device not showing' },
                    { id: 'login_issue', title: 'Login/Password' },
                    { id: 'firmware', title: 'Firmware Update' },
                    { id: 'other_tech', title: 'Other Issue' },
                  ],
                },
              ],
            },
          },
        },
        nextState: 'TECH_MENU',
        escalation: false,
      };
    }
    if (lower === '3' || lower.includes('payment')) {
      return {
        reply:
          'Payment & Billing options:\n1️⃣ Update Payment Method\n2️⃣ View or Download Invoice\n3️⃣ Payment Failed / Double Charged\n4️⃣ Subscription / Cancellation\n5️⃣ Talk to Billing Team\n\nType "Menu" to return.',
        nextState: 'BILLING_MENU',
        escalation: false,
      };
    }
    if (lower === '4' || lower.includes('live')) {
      return {
        reply: 'Connecting you to a live expert...',
        nextState: 'ESCALATED',
        escalation: true,
      };
    }
  }

  if (session.currentState === 'GENERAL_MENU') {
    const selectionMap = {
      yoga: 'Yoga & Meditation',
      workshops: 'Online Workshops',
      mood: 'Mood Tracker',
      dosha: 'Dosha Tracker',
      health: 'Health Tracker',
      period: 'Period Tracker',
      pcos: 'PCOS / PCOD',
      thyroid: 'Thyroid Support',
      menopause: 'Menopause Care',
      diet: 'Diet & Nutrition',
    };
    const selection = selectionMap[lower] || lower;
    return {
      reply: `You are in the *${selection}* section 🌸.\n(This feature is under development). \n\nType "Menu" to return.`,
      nextState: 'GENERAL_MENU',
      escalation: false,
    };
  }

  if (session.currentState === 'TECH_MENU') {
    const selectionMap = {
      app_issue: 'App not working',
      device_issue: 'Device not showing',
      login_issue: 'Login/Password',
      firmware: 'Firmware Update',
      other_tech: 'Other Technical Issue',
    };
    const selection = selectionMap[lower] || lower;
    return {
      reply: `You selected *${selection}* 🛠.\nSupport logic coming soon.\n\nType "Menu" to return.`,
      nextState: 'TECH_MENU',
      escalation: false,
    };
  }

  return {
    reply: 'Sorry, I didn’t understand that. Type "Menu" to see options.',
    nextState: session.currentState,
    escalation: false,
  };
};
export default { processIncoming, getStats, sendTemplateMessage };
