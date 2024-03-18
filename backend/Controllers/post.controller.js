const enums = require("../Utils/enums.json");
const messages = require("../utils/messages.json");
const postSchema = require("../models/post.model");
const commentSchema = require("../models/comment.model");

module.exports = {
  createPost: async (req, res) => {
    const { description, userId } = req.body;
    try {

      const userdata = await postSchema.findOne({ _id : userId });
      const post = {
        description,
        user: userId,
      };

      const postdata = await postSchema.create(post);

      if (postdata) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: messages.POST_SUCCESS });
      } else {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: messages.FAILED });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      let post = await postSchema.find().populate("user").sort({ createdAt: -1 });
      if (post) {
        
        const postWithComment = await Promise.all(
          post.map(async (post) => {
            const comment = await commentSchema.find({ post: post._id }).populate("user");
    
            if(comment.length !=0 ) 
            {
              const withComment = {...post.toObject() , comment};
              return withComment
            }
            else{
              return post
            }
            
          })
        )
        
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: messages.SUCCESS, post : postWithComment});
      } else {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: messages.FAILED });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: err.message });
    }
  },
  doLike: async (req, res) => {
    try {
      const { postId } = req.body;
      const postdata = await postSchema.findOne({ _id: postId });
  
      const update = await postSchema.updateOne(
        { _id: postId },
        { $set: { like: postdata.like + 1 } }
      );
      if (update) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: messages.SUCCESS, post : postdata});
      } else {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: messages.FAILED });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: err.message });
    }
  },
  doComment: async (req, res) => {
    try {
      const { comment, postId, userId } = req.body;
      const commentdata = {
        comment,
        post: postId,
        user: userId,
      };

      const commentupdate = await commentSchema.create(commentdata);
      const postdata = await postSchema.findOne({ _id: postId });
      const postupdate = await postSchema.updateOne(
        { _id: postId },
        { $set: { commentCount: postdata.commentCount + 1 } }
      );

      if (commentupdate && postupdate) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: messages.COMMENT_SUCCESS ,post : postdata});
      } else {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: messages.FAILED });
      }
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: err.message });
    }
  },
};
