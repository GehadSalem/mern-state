import express from "express";
import * as userController from '../controller/user.controller.js'

const router = express.Router();


router.get('/test', userController.test)


export default router;