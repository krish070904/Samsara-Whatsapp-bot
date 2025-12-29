import logger from '../utils/logger.js';

const generateResponse = async (prompt) => {
  logger.info(`AI prompt received: ${prompt}`);
  return prompt; // Echo for usage; replace with LLM call later
};

export default { generateResponse };
