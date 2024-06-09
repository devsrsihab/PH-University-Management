import express from 'express';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';

const router = express.Router();

// create
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidatonSchema),
  AuthControllers.loginUser,
);
export const AuthRoute = router;
