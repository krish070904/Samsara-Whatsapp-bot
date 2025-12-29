import mongoose from 'mongoose';

const EscalationSchema = new mongoose.Schema({
  whatsappId: { type: String, required: true },
  transcript: { type: Array, default: [] },
}, { timestamps: true });

export default mongoose.model('Escalation', EscalationSchema);
