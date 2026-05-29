import express from 'express';
import {
  googleLogin,
  login,
  registerUser
} from '../controller/userController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.post(
  "/google-login",
  googleLogin
);

export default router;