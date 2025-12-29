import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
import logger from './config/logger.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * Starts the application.
 * In development mode we spin up an in‑memory MongoDB instance using
 * `mongodb-memory-server`. This removes the external dependency on a running
 * MongoDB server and lets the app start instantly.
 */
const start = async () => {
  try {
    let mongoUri = config.mongoose.url;
    // If we are in development and no explicit URL is provided, use in‑memory DB
    if (config.env === 'development' && (!process.env.MONGODB_URL || process.env.MONGODB_URL === '')) {
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      logger.info('Started in‑memory MongoDB');
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
