import { useState, useContext } from 'react';
import { UserContext } from '../UserContext';

function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const { userInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const response = await fetch(`http://34.130.156.109:4000/post/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content }),
    });
    if (response.ok) {
      setContent('');
      onCommentAdded(await response.json());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
        <div className = "comment-form"> 
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit">Add Comment</button>
        </div>
    </form>

  );
}

export default CommentForm;
