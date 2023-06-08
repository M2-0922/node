import { verifyToken } from "../utils/jwtUtils.js";

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).json({
            message: "UnAuthorizated"
        })
    }

    try {
        const user = verifyToken(authHeader);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid token"
        })
    }
}

export {
    authenticateToken
};