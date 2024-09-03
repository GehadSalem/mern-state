import express from "express";
import * as listingController from "../controller/listing.controller.js"
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();


router.post('/create', verifyToken ,listingController.createListing);
router.delete('/delete/:id', verifyToken, listingController.deleteListing);
router.post('/update/:id', verifyToken, listingController.updateListing);
router.get('/get/:id', listingController.getListing);
router.get('/get', listingController.getSearchListing)
export default router