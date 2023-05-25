import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_JWT_KEY;

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
}

function verifyToken (token) {
    return jwt.verify(token, SECRET_KEY)
}

export { generateToken, verifyToken }