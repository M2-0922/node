import Post from "../model/post";

const whoOwner = async (req, res, next) =>{
    const { id } = req.params;
    const userId = req.user.id
    const post = await Post.findById(id);

    if(post.author === userId) {
        next();
    }
    else {
        res.status(401).json({
            message: "Unauthorized access"
          });
    }
}

export default myMiddleware;