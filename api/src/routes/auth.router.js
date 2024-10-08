import express from "express";
import * as authController from '../controller/auth.controller.js'

const router = express.Router();


router.post('/signup', authController.signUp)
router.post('/signin', authController.signin)
router.post('/google', authController.google)
router.get('/signout', authController.signout)

export default router;