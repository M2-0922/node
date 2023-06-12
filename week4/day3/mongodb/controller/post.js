import Post from "../model/post.js";

const getAllPosts = async (req, res, next) => {
	try {
		let posts = await Post.find({});

		res.status(200).json({
			posts,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
};

const getPostById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id);

		if (!post) {
			return res.status(404).json({
				message: `ID: ${id} of post couldn't found.`,
			});
		}

		return res.status(200).json({
			post,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Server error",
		});
	}
};

const createAPost = async (req, res, next) => {
	try {
		const postData = req.body;

		let post = new Post(postData);

		await post.save();

		res.status(201).json({
			post,
		});
	} catch (error) {}
};
const updatePost = async (req, res, next) => {
	const { id } = req.params;
	const { title, article, tags, image } = req.body;

	try {
		const post = await Post.findByIdAndUpdate(
			id,
			{
				title,
				article,
				tags,
				image,
			},
			{ new: true }
		);

		res.status(200).json({
			post,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
};

const deletePost = async (req, res, next) => {
	const { id } = req.params;

	try {
		await Post.findByIdAndDelete(id);

		res.status(200).json({
			message: `Post: ${id} is deleted!`,
		});
	} catch (error) {
		res.status(500).json({
			message: `Server error`,
		});
	}
};

const createComment = async (req, res, next) => {
	const { id } = req.params;
	const { comment } = req.body;

	try {
		const post = await Post.findById(id);

		if (!post) {
			return res.status(404).json({
				message: `Post with ID: ${id} not found.`,
			});
		}

		post.comments.push(comment);
		await post.save();

		res.status(201).json({
			message: "Comment added successfully",
			post,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
};

const deleteComment = async (req, res, next) => {
	const { id } = req.params;
	const { commentId } = req.body;

	try {
		const post = await Post.findById(id);

		if (!post) {
			return res.status(404).json({
				message: `Post with ID: ${id} not found.`,
			});
		}

		post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
		await post.save();

		res.status(200).json({
			message: "Comment deleted successfully",
			post,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
};

const likePost = async (req, res, next) => {
	const { id } = req.params;
	const { userId } = req.body;

	try {
		const post = await Post.findById(id);

		if (!post) {
			return res.status(404).json({
				message: `Post with ID: ${id} not found.`,
			});
		}

		const likedByUser = post.likes.includes(userId);

		if (likedByUser) {
			return res.status(400).json({
				message: "Post already liked by the user.",
			});
		}

		post.likes.push(userId);
		await post.save();

		res.status(201).json({
			message: "Post liked successfully",
			post,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
};

const unlikePost = async (req, res, next) => {
	const { id } = req.params;
	const { userId } = req.body;

	try {
		const post = await Post.findById(id);

		if (!post) {
			return res.status(404).json({
				message: `Post with ID: ${id} not found.`,
			});
		}

		const likedByUser = post.likes.includes(userId);

		if (!likedByUser) {
			return res.status(400).json({
				message: "Post not liked by the user.",
			});
		}

		post.likes = post.likes.filter((like) => like.toString() !== userId);
		await post.save();

		res.status(200).json({
			message: "Post unliked successfully",
			post,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
};

export { getAllPosts, getPostById, createAPost, updatePost, deletePost, createComment, deleteComment, likePost, unlikePost };
