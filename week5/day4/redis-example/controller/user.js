import User from "../model/user.js";

const getMe = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findById(id).select("-password");
        
        return res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

export {
    getMe
}