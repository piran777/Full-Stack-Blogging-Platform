import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
import CommentForm from "./CommentForm"; // Adjust the path as needed

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });

        fetch(`http://localhost:4000/post/${id}/comments`)
            .then(response => response.json())
            .then(setComments);
    }, [id]);

    const handleCommentAdded = (comment) => {
        setComments([...comments, comment]);
    };

    if (!postInfo) return '';

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
            <div className="author">by {postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        Edit
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </Link>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    
        {/* Tags display section */}
            {postInfo.tags && postInfo.tags.length > 0 && (
            <div className="tags-section">
                <h3>Tags:</h3>
                <div className="tags">
                {postInfo.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
                </div>
            </div>
            )}
            
            <h2>Comments</h2> {/* Added this line */}
            <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
            <div className="comments">
                {comments.map(comment => (
                    <div key={comment._id} className="comment">
                        <div className="comment-author">
                            <strong>{comment.author.username}</strong> {/* Added strong tag for emphasis */}
                            <span> - {format(new Date(comment.createdAt), 'MMM d, yyyy HH:mm')}</span> {/* Added time */}
                        </div>
                        <div className="comment-content">{comment.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
    
}
