// app.ts

import express from 'express';

// ----------------------------------------------------------------------
// Import Child Routes
// ----------------------------------------------------------------------
import authRoutes from './routes/auth.routes';

const parentRoutes = express.Router();

parentRoutes.use('/api/v1', authRoutes);

export default parentRoutes;
