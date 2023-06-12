import Comment from '../model/comment';
import Post from '../model/post';

const createComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const user = req.user;

        let newComment = new Comment({
            comment: comment,
            author: user._id,
            post: id,
            likes: []
        });

        await newComment.save();

        await Post.findByIdAndUpdate(id, {
            $push: { comments: newComment._id }
        })

        res.status(201).json({
            newComment
        })
    } catch (error) {
        
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);

        await Post.findByIdAndUpdate(id, {
            $pull: { comments: newComment._id }
        })

        res.status(200).json({
            message: `Comment: ${id} is deleted!`
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

        Comment.findById(id, (err, foundItem) => {
            if(!foundItem.likes.includes(user._id)){
                Comment.findByIdAndUpdate(
                    id, 
                    {$push : {likes: user._id}}
                );
            }
        })

        res.status(201).json({
            message: `Comment : ${id} is liked!`
        })
    } catch (error) {
        
    }
}

const deleteLike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        await Comment.findByIdAndUpdate(id, {
            $pull: { likes : user._id }
        });

        res.status(200).json({
            message: `Like for comment: ${id} is deleted!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Server error`
        })
    }
}

export {
    createComment,
    deleteComment,
    createLike,
    deleteLike
}