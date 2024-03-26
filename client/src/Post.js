import { format } from 'date-fns';
import './App.css';
export default function Post({title, summary, cover, content,createdAt}){

    return(
        
        <div className = "entry">

          <div className = "image"> 
          
        <img src = "https://media.wired.com/photos/65ccd9f77471dc114917975f/master/w_960%2Cc_limit/Gear-Anker_MagGo_Qi2_Pad_2-SOURCE-Simon-Hill.jpg" alt = "" />
        </div>
        <div clasName = "texts"> 
        <h2>{title} </h2>
        <p className = "info">
          <a className = "author">Piran A. </a>
          <time>{format(new Date (createdAt), 'MMM d, yyyy HH:mm')}</time>
          
           </p>
        
        <p className = "summary">{summary}

       </p>
        
        </div>
        </div>



    );

}