import Post from "../model/post.js"

const getAllPosts = async (req, res, next) => {
    
    try {
        let posts = await Post.find({});
        
        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}
const getPostById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({
                message: `ID: ${id} of post couldn't found.`
            })
        }

        return res.status(200).json({
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}
const createAPost = async (req, res, next) => {
    try {
        const postData = req.body;

        let post = new Post(postData);

        await post.save();

        

        res.status(201).json({
            post
        })
    } catch (error) {
        
    }
}
const updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, article, tags, image } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, {
            title,
            article,
            tags,
            image
        }, { new: true });

        res.status(200).json({
            post
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

const deletePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);

        res.status(200).json({
            message: `Post: ${id} is deleted!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Server error`
        })
    }
}

const createLike = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        const user = req.user;

        Post.findById(id, (err, foundItem) => {
            if(!foundItem.likes.includes(user._id)){
                Post.findByIdAndUpdate(
                    id, 
                    {$push : {likes: user._id}}
                );
            }
        })

        res.status(201).json({
            message: `Post : ${id} is liked!`
        })
    } catch (error) {
        
    }
}

const deleteLike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        await Post.findByIdAndUpdate(id, {
            $pull: { likes : user._id }
        });

        res.status(200).json({
            message: `Like for post: ${id} is deleted!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Server error`
        })
    }
}

export {
    getAllPosts,
    getPostById,
    createAPost,
    updatePost,
    deletePost,
    createLike,
    deleteLike
}