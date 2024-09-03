import express from "express";
import * as userController from '../controller/user.controller.js'
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get('/test', userController.test);
router.post('/update/:id', verifyToken, userController.updateUser);
router.delete('/delete/:id', verifyToken, userController.deleteUser);
router.get('/listings/:id', verifyToken, userController.getUserListing);
router.get('/:id', verifyToken, userController.getUser)
export default router;