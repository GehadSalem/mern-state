import listingModel from "../../DB/models/Listing.model.js";
import { asyncHandler } from "../utils/errorHandling.js";

export const createListing = asyncHandler(async(req,res,next)=>{
    try {
        const listing = await listingModel.create({...req.body, userRef: req.user.id})
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
})

export const deleteListing = asyncHandler(async(req, res, next) => {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
        return next(new Error(`Listing not found!`), { cause: 401 });
    }
    console.log(req.user.id);
    console.log(listing.userRef);
    
    if (req.user.id !== String(listing.userRef)) {
        return next(new Error(`You can only delete your own listings!`), { cause: 401 });
    }
    try {
        await listingModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
});


export const updateListing = asyncHandler(async(req,res,next)=>{
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
        return next(new Error(`Listing not found!`), { cause: 401 });
    }
    if (req.user.id !== String(listing.userRef)) {
        return next(new Error(`You can only delete your own listings!`), { cause: 401 });
    }
    try {
        const updatedListing = await listingModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
})


export const getListing = asyncHandler(async(req,res,next)=>{
    try {
        const listing = await listingModel.findById(req.params.id);
    if (!listing) {
        return next(new Error(`Listing not found!`), { cause: 401 });
    }
    res.status(200).json(listing); 
    } catch (error) {
        next(error)
    }
})