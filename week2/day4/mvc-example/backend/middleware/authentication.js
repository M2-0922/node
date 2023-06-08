import { verifyToken } from "../util/jwtUtil.js";

const authentication = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const user = verifyToken(authorization);

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    req.user = user;
    next();
}

export { authentication }