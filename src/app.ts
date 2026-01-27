// app.ts

import express from 'express';

// ----------------------------------------------------------------------
// Import Child Routes
// ----------------------------------------------------------------------
import studentRoutes from './routes/student.routes';

const parentRoutes = express.Router();

parentRoutes.use('/api/v1', studentRoutes);

export default parentRoutes;
