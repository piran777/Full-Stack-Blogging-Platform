import { format } from 'date-fns';
import './App.css';
import {Link} from "react-router-dom"
export default function Post({_id,title, summary, cover, content,createdAt, author}){

    return(
        
        <div className = "entry">

          <div className = "image"> 
          <Link to = {`/post/${_id}`}>
          <img src = {'http://34.130.156.109:4000/'+cover} className = "p" alt = "" />
          </Link>
          
       
        </div>
        <div clasName = "texts">
        <Link to = {`/post/${_id}`}> 
        <h2>{title} </h2>
        </Link>
        <p className = "info">
          <a className = "author">{author.username} </a>
          <time>{format(new Date (createdAt), 'MMM d, yyyy HH:mm')}</time>
          
           </p>
        
        <p className = "summary">{summary}

       </p>
        
        </div>
        </div>



    );

}