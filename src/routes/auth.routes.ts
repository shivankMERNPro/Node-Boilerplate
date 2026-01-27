import express from 'express';

import { registerSchema} from '../validationSchemas/auth. schema';
import { registerUserController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';

//-----------------------------------//
const router = express.Router();

router.post(
  '/auth/register',
  validateRequest(registerSchema),
  registerUserController,
);

// router.post("/auth/login", validateRequest(registerSchema), registerController);
// router.get("/auth/refresh", validateRequest(registerSchema), registerController);
export default router;
