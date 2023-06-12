import Post from "../model/post.js"
import mongoose from 'mongoose';


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

// Handler for liking a post
const likePost = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({
          message: `Post with ID ${id} not found`
        });
      }
  
      post.likes++;
      await post.save();
  
      res.status(200).json({
        post
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error'
      });
    }
  };
  
  // Handler for adding a comment to a post
  const addComment = async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
  
    try {
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({
          message: `Post with ID ${id} not found`
        });
      }
  
      const newComment = { text };
      post.comments.push(newComment);
      await post.save();
  
      res.status(200).json({
        post
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error'
      });
    }
  };
  


const createAPost = async (req, res, next) => {
    try {
      const { title, article, tags, image, likes, comments } = req.body;
  
      const postData = {
        title,
        article,
        tags,
        image,
        likes,
        comments
      };
  
      let post = new Post(postData);
      await post.save();
  
      res.status(201).json({
        post
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error'
      });
    }
  };
  

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
        
        if (!post) {
            return res.status(404).json({
              message: `Post with ID ${id} not found`
            });
          }
      

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

export {
    getAllPosts,
    getPostById,
    createAPost,
    updatePost,
    deletePost,
    addComment,
    likePost
}