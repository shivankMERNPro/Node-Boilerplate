import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || '',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI as string,
  mongoDbName: process.env.MONGO_DB_NAME as string,
  mongoMaxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE) || 0,
  mongoMinPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE) || 0,
  mongoConnectTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT_MS) || 0,
  mongoSocketTimeoutMS: Number(process.env.MONGO_SOCKET_TIMEOUT_MS) || 0,
  jwtSecret: (process.env.JWT_SECRET as string) || '',
  corsOrigin: (process.env.CORS_ORIGIN as string) || '',
};
