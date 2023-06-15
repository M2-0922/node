import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import redis_client from '../config/redis.js';

const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                message: "User already exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_ACCESS,
            { expiresIn: "10s" }
        );

        const refreshToken = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_REFRESH,
            { expiresIn: "7d" }
        );

        redis_client.SET(newUser._id.toString(), refreshToken, (err, reply) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Server Error"
                })
            }
            console.log(reply);
        });

        return res.status(200).json({
            message: "User created successfully",
            accessToken,
            refreshToken
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password"
            })
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_ACCESS,
            { expiresIn: "10s" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_REFRESH,
            { expiresIn: "7d" }
        );

        redis_client.SET(user._id.toString(), refreshToken, (err, reply) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Server Error"
                })
            }
            console.log(reply);
        });

        return res.status(200).json({
            message: "User logged in successfully",
            accessToken,
            refreshToken
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

const logout = async (req, res) => {
    const { id } = req.body;

    try {
        
        await redis_client.DEL(id.toString(), (err, reply) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Server Error"
                })
            }
            console.log(reply);
        });

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if(!refreshToken) {
        return res.status(401).json({
            message: "Access denied"
        })
    }

    try {
        
        jwt.verify(refreshToken, process.env.SECRET_REFRESH, (err, decoded) => {
            if(err) {
                console.log(err);
                return res.status(401).json({
                    message: "Access denied"
                });
            }

            if(decoded) {
                const accessToken = jwt.sign(
                    { id: decoded.id },
                    process.env.SECRET_ACCESS,
                    { expiresIn: "10s" }
                );

                return res.status(200).json({
                    message: "Access token refreshed successfully",
                    accessToken
                });
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

export {
    register,
    login,
    logout,
    refresh
}