import jwt from "jsonwebtoken";
import User from "../models/User.js";
/** Middleware to check if some user is authorized to see or make something, use next 
 * to keep going on the next middleware **/
const checkAuth = async (req, res, next) => {
    /** @token is going to be a JSON Web Token generated on authentication **/
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            /** Remove BEARER word in authentication **/
            token = req.headers.authorization.split(" ")[1];
            /** Unencode JWT **/
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            /** req. @user is a new variable created here. Removed information that we dont need from the object **/
            req.user = await User.findById(decoded.id).select(' -password -confirmed -token -createdAt -updatedAt -__v ');

            return next()
        } catch (error) {
            return res.status(404).json({ msg: 'Hubo un error' })
        }
    }
    if (!token) {
        const error = new Error(`Non valid token`);
        return res.status(401).json({ msg: error.message });
    }

    next();
};

export default checkAuth;