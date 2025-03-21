import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token || req.cookies.admin_access_token;

    if(!token) return next(errorHandler(401, 'You need to login!'))
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return next(errorHandler(403, "Token is not valid."));
       
            const user = await User.findById(decoded.id);
            if (!user) return next(errorHandler(404, "User not found!"));
    
            req.user = user;
            next();
        });
    // jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
    //     if(err) return next(errorHandler(403,'Token is not valid.'))
    //     req.user = user;
    //     next();
    // })
}