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
    res.status(201).json({ message: "Done", user });
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
    
    const {password:pass, ...rest} = validEmail._doc
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "done", rest });
  } catch (error) {
    next(error);
  }
});
