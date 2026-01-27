import cors, { CorsOptions } from 'cors';
import { env } from '../constants/env';
import { logger } from '../utils/logger';

const allowedOrigins = env.corsOrigin ? env.corsOrigin.split(',') : [];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (env.nodeEnv !== 'production' || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const corsMiddleware = cors(corsOptions);
