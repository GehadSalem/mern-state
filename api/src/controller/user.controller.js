import listingModel from "../../DB/models/Listing.model.js";
import userModel from "../../DB/models/User.model.js";
import { asyncHandler } from "../utils/errorHandling.js"
import bcryptjs from "bcryptjs";

export const test = (req,res,next)=>{
    res.json({message: 'api route works well'})
}

export const updateUser =  asyncHandler(async(req,res,next)=>{
    if (req.user.id !== req.params.id) {
        return next(new Error(`you can update only your own account!`), { cause: 401 });
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                userName: req.body.userName,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        }, {new: true})
        const{password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
})


export const deleteUser = asyncHandler(async(req,res,next)=>{
    if (req.user.id !== req.params.id) {
        return next(new Error(`you can delete only your own account!`), { cause: 401 });
    }
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error)
    }
})


export const getUserListing = asyncHandler(async(req,res,next)=>{
    if (req.user.id === req.params.id) {
        try {
            const listing = await listingModel.find({userRef: req.params.id});
            res.status(200).json(listing);
        } catch (error) {
            next(error);
        }
    }else{
        return next(new Error(`you can view only your listings!`), { cause: 401 });
    }
})


export const getUser = asyncHandler(async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.params.id);
    if (!user) {
        return next(new Error(`User not found!`), { cause: 401 });
    }
    const {password:pass, ...rest} = user._doc;
    res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})