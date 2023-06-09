import Post from "../model/post.js"

async function checkUser(req, res, next) {
    try {
        const { id } = req.params;
        const { _id } = req.user;

        const post = await Post.findById(id);

        if (post.author === _id){
            next();
        } else {
            return res.status(501).json({
                message: "You cannot change another author's post"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export default checkUser;