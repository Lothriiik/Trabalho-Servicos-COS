import React, { useState } from 'react';
import './Post.css';
import { 
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined

} from '@ant-design/icons';

function Post({ post }) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Ana Torres',
      authorUsername: '@anatorres',
      content: 'Muito interessante! Obrigada por compartilhar.',
      likes: 3,
      dislike: 0,
      liked: false,
      disliked: false,
    },
    {
      id: 2,
      author: 'Carlos Mendes',
      authorUsername: '@carlosmendes',
      content: 'Já experimentei e realmente é muito bom!',
      likes: 1,
      dislike: 0,
      liked: false,
      disliked: false,
    }
  ]);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleCommentlike = (id) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      )
    );
  };
  const toggleCommentdislike = (id) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === id
          ? {
              ...comment,
              disliked: !comment.disliked,
              dislike: comment.disliked ? comment.dislike - 1 : comment.dislike + 1
            }
          : comment
      )
    );
  };

  const toggleDislike = () => {
    setDislike(!dislike);
  };

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };
  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: 'Usuário',
      authorUsername: '@usuario',
      content: commentText,
      likes: 0 ,
      dislike: 0,
      liked: false,
      disliked: false,
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-author-info">
          <div className="post-author-name">
            <span className="author-name">{post.author}</span>
            <span className="author-username">{post.authorUsername}</span>
          </div>
          <span className="post-timestamp">{post.timestamp}</span>
        </div>
        <button className="post-menu">•••</button>
      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">
      <div>
      </div>
        <button 
          className="action-button" 
          onClick={toggleComments}
        >
          <CommentOutlined /> {post.comments}
        </button>
        <button 
          className={`action-button ${liked ? 'liked' : ''}`} 
          onClick={toggleLike}
        >
          {liked ? <LikeOutlined style={{color:'#1a91da'}}/> : <LikeOutlined />} {liked ? post.likes + 1 : post.likes}
        </button>

        <button 
          className={`action-button ${dislike ? 'disliked' : ''}`} 
          onClick={toggleDislike}
        >
          {dislike ? <DislikeOutlined style={{color:'red'}}/> : <DislikeOutlined />} {dislike ? post.dislike + 1 : post.dislike}
        </button>
        <div>
        </div>
        
      </div>

      {isCommentsOpen && (
        <div className="comments-section">
          <h3>Comentários ({comments.length})</h3>
          
          <form className="comment-composer" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Adicione um comentário..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={!commentText.trim()}
            >
              Enviar
            </button>
          </form>
          
          <div className="comments-list">
            {comments.map(comment => {
              return(
              <div className="comment" key={comment.id}>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-username">{comment.authorUsername}</span>
                    <span className="comment-timestamp">{comment.timestamp}</span>
                  </div>
                  <p>{comment.content}</p>
                  <div className="comment-actions">
                    <button
                      className={`action-button ${comment.liked ? 'liked' : ''}`}
                      onClick={() => toggleCommentlike(comment.id)}
                    >
                      {comment.liked ? (
                        <LikeOutlined style={{ color: '#1a91da' }} />
                      ) : (
                        <LikeOutlined />
                      )}{' '}
                      {comment.likes}
                    </button>

                    <button
                      className={`action-button ${comment.disliked ? 'disliked' : ''}`}
                      onClick={() => toggleCommentdislike(comment.id)}
                    >
                      {comment.disliked ? (
                        <DislikeOutlined style={{ color:'red' }} />
                      ) : (
                        <DislikeOutlined />
                      )}{' '}
                      {comment.dislike}
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;