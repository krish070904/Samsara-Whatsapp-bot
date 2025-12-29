import express from 'express';
import * as webhookController from '../../controllers/whatsapp.controller.js';
const router = express.Router();
router.get('/', webhookController.verifyWebhook);
router.post('/', webhookController.handleWebhook);
router.get('/stats', webhookController.getStats);
router.post('/send-template', webhookController.sendTemplate);
export default router;
