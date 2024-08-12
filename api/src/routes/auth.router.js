import express from "express";
import * as authController from '../controller/auth.controller.js'

const router = express.Router();


router.post('/signup', authController.signUp)
router.post('/signin', authController.signin)

export default router;