import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Post from "./Post";
import "./Social.css";
import "react-toastify/dist/ReactToastify.css";

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);
  const [toggleCommentBoxId, setToggleCommentBoxId] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false); 
  const [newPostContent, setNewPostContent] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/getpost")
      .then((res) => {
        setPosts(res.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddPost = () => {
    console.log("Post content:", newPostContent);

    try {
      axios
        .post("http://localhost:3001/user/post", {
          description: newPostContent,
          userId: JSON.parse(localStorage.getItem("user"))._id,
        })
        .then(async (res) => {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
          });
          const r = await axios("http://localhost:3001/user/getpost")
            .then((res) => {
              setPosts(res.data.post);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          toast.error("Post cann't be empty!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
          });
          throw err;
        });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    }
    setShowAddPost(false);
    setNewPostContent("");
  };

  const likePost = (id) => {
    axios
      .post("http://localhost:3001/user/like", { postId: id })
      .then((res) => {
        const updatedpost = posts.map((post) => {
          if (post._id === id) return { ...post, like: post.like + 1 };
          return post;
        });
        setPosts(updatedpost);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleCommentBox = (id) => {
    setToggleCommentBoxId((prevId) => (prevId === id ? null : id));
  };

  const addComment = (id, comment) => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("http://localhost:3001/user/comment", {
        postId: id,
        comment,
        userId: user._id,
      })
      .then(async (res) => {
        console.log(res.data.message);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
        });
        // window.location.reload(true);
        const r = await axios("http://localhost:3001/user/getpost")
          .then((res) => {
            setPosts(res.data.post);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
        });
        throw err;
      });
  };

  const toggleCommentsVisibility = (id) => {
    setVisibleCommentsPostId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="social-container">
      <button
        className="add-post-button"
        onClick={() => setShowAddPost(!showAddPost)}
      >
        {showAddPost ? "-" : "+"}
      </button>
      {showAddPost && (
        <div className="add-post-form">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button onClick={handleAddPost} className="post-button">
            Post
          </button>
        </div>
      )}
      {posts.map((post) => (
        <Post
          key={post._id}
          post={{
            ...post,
            commentsVisible: post._id === visibleCommentsPostId,
            showCommentBox: post._id === toggleCommentBoxId,
          }}
          likePost={() => likePost(post._id)}
          toggleCommentBox={() => toggleCommentBox(post._id)}
          addComment={(comment) => addComment(post._id, comment)}
          toggleCommentsVisibility={() => toggleCommentsVisibility(post._id)}
        />
      ))}
      <ToastContainer />
    </div>
  );
};

export default Social;
