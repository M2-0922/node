import Post from "../model/post.js";

async function matchid(req, res, next) {
    const { id } = req.params; //get params from post(route)
    // const userid = req.user.id; //get user from authentication(middleware)
    const post = await Post.findById(id);
    
    try {
        if(post.author === id) {
        // if(post.author === userid) {
            next();
        } else {
            return res.status(401).json({
                message: "useid and authorid doen't mutch"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export default matchid;