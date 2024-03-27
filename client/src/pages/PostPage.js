import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {format} from "date-fns";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import {Link} from "react-router-dom";

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams(); //we know from console output that we can get id from useParams
    useEffect(() => {
        
        fetch(`http://localhost:4000/post/${id}` ).then(response => {
            response.json().then(postInfo=>{
                setPostInfo(postInfo);

            });
        });


    },[]);
    if(!postInfo) return '';

    return(
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt),'MMM d, yyyy HH:mm')}</time>
            <div className="author">by {postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className = "edit-row">
                    <Link className = "edit-btn" to={`/edit/${postInfo._id}`}> 
                    
                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg></Link>
                    
                </div>
            )}
            <div className="image"> 
            <img src = {`http://localhost:4000/${postInfo.cover}`} alt ="" />
            </div>
            
            <div className = "content" dangerouslySetInnerHTML={{__html: postInfo.content}} />
        </div>
    )
}