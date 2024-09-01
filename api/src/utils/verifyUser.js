import jwt from "jsonwebtoken";



export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;

    if (!token) return next(new Error(`Unauthorized!`), { cause: 401 });
    jwt.verify(token, process.env.BEARER_TOKEN, (err, user)=>{
        if (err) return next(new Error(`Forbidden!`), { cause: 403 });
        req.user = user;
        next();
    })

}