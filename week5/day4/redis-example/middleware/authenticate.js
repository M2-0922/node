import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    const { token } = req.headers;

    if(!token) {
        return res.status(401).json({
            message: "Access denied"
        })
    }

    try {

        const decoded = await jwt.verify(token, process.env.SECRET_ACCESS);
        
        if(decoded) {
            req.user = decoded;
            return next();
        }else{
            return res.status(401).json({
                message: "Access denied"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

export { authenticate }