import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
import logger from './config/logger.js';
const start = async () => {
  try {
    // In production, MONGODB_URL is mandatory.
    // In development, please set MONGODB_URL in .env to a local or cloud instance.
    let mongoUri = config.mongoose.url;

    if (!mongoUri) {
      throw new Error('MONGODB_URL is missing in environment variables');
    }

    await mongoose.connect(mongoUri, config.mongoose.options);
    logger.info('Connected to MongoDB');

    const server = app.listen(config.port, () => {
      logger.info(`🌿 Samsara Node Boilerplate running on port ${config.port}`);
      logger.info(`📱 App URL: ${process.env.APP_URL || `http://localhost:${config.port}`}`);
      logger.info(`🔐 Environment: ${config.env}`);
      logger.info(`💽 MongoDB: Connected`);
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.info('Server closed');
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error) => {
      logger.error(error);
      exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      if (server) server.close();
    });
  } catch (err) {
    logger.error('Failed to start application:', err);
    process.exit(1);
  }
};

start();
