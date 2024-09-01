import userModel from "../../DB/models/User.model.js";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../utils/errorHandling.js";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashedPAssword = bcryptjs.hashSync(password, 10);
  try {
    const user = await userModel.create({
      userName,
      email,
      password: hashedPAssword,
    });
    res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
});

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validEmail = await userModel.findOne({ email });
    if (!validEmail) {
      return next(new Error(`email ${req.body.email} is not exist`), {
        cause: 409,
      });
    }
    const validPassword = bcryptjs.compareSync(password, validEmail.password);
    if (!validPassword) {
      return next(new Error(`Email or password is wrong!`), { cause: 409 });
    }
    const token = jwt.sign({ id: validEmail._id }, process.env.BEARER_TOKEN);

    const { password: pass, ...rest } = validEmail._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
});

export const google = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.BEARER_TOKEN);
      const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new userModel({userName: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo})

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.BEARER_TOKEN);
      const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
    }
  } catch (error) {next(error);}
});


export const signout = asyncHandler(async(req,res,next)=>{
  try {
    res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error)
  }
})