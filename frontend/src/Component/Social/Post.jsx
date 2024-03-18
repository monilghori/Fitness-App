import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import "./Post.css";

const Post = ({ post, likePost, toggleCommentBox, addComment, toggleCommentsVisibility }) => {
  return (
    <div className="post">
      <div className="post-header">
        <span className="user-avatar">{post.user.name[0]}</span>
        <span className="user-name">{post.user.name}</span>
      </div>
      <p className='post-description'>{post.description}</p>
      {/* <img src={post.url} alt="Post" className="post-image" /> */}
      <div className="actions">
        <button onClick={likePost} className="icon-button">
          <FontAwesomeIcon icon={faThumbsUp} size="lg" /> {post.like}
        </button>
        <button onClick={toggleCommentBox} className="icon-button">
          <FontAwesomeIcon icon={faComment} size="lg" /> {post.commentCount}
        </button>
      </div>
      {post.showCommentBox && (
        <form className="comment-form" onSubmit={(e) => {
          e.preventDefault();
          const comment = e.target.elements.comment.value;
          addComment(comment);
          e.target.elements.comment.value = '';
        }}>
          <input className='comment-input' type="text" name="comment" placeholder="Write a comment..." />
          <button className="post-button" type="submit">Post</button>
        </form>
      )}
      <button onClick={toggleCommentsVisibility} className="toggle-comments">
        {post.commentsVisible ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />} Comments
      </button>
      {post.commentsVisible && (
        <div className="comments">
          {post.comment ? post.comment.map((comment, index) => (
            <div key={index} className="comment"><strong>{comment.user.name}: </strong>{comment.comment}</div>
          )): <div className="comment">There is no comments.</div>}
        </div>
      )}
    </div>
  );
};

export default Post;
