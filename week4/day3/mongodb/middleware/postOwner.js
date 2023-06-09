import Post from "../model/post.js"

const postOwner = async (req, res, next) => {
    const { id } = req.params;

    try {
        let post = await Post.findById(id);

        if(post.author.equals(req.user._id)){
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorized...'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export default postOwner;