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
        const listing = await listingModel.findById(req.params.id).populate('userRef', 'userName');
    if (!listing) {
        return next(new Error(`Listing not found!`), { cause: 401 });
    }
    res.status(200).json(listing); 
    } catch (error) {
        next(error)
    }
})

export const getSearchListing = asyncHandler(async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      
      // Parse query parameters
      const offer = req.query.offer === 'true' ? true : req.query.offer === 'false' ? false : {$in: [false, true]};
      const furnished = req.query.furnished === 'true' ? true : req.query.furnished === 'false' ? false : {$in: [false, true]};
      const parking = req.query.parking === 'true' ? true : req.query.parking === 'false' ? false : {$in: [false, true]};
      const type = req.query.type === 'sale' || req.query.type === 'rent' ? req.query.type : {$in: ['sale', 'rent']};
      const searchTerm = req.query.searchTerm ? { $regex: req.query.searchTerm, $options: 'i' } : { $exists: true }; // Match any document if searchTerm is empty or undefined
      
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order === 'asc' ? 1 : -1; // Ensure proper sorting order
      
      // Fetch listings from database
      const listing = await listingModel.find({
        name: searchTerm,
        offer,
        furnished,
        parking,
        type,
      }).populate('userRef', 'userName').sort({ [sort]: order }).limit(limit).skip(startIndex);
      
      return res.json(listing);
    } catch (error) {
      next(error);
    }
  });
  