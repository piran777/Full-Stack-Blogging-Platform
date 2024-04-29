import '../App.css';
import Post from "../Post";
import { useEffect, useState } from 'react';

export default function IndexPage(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {

        const response = fetch('http://34.130.156.109:4000/post' ).then(response =>{ //get request because it is the default
            response.json().then(posts => {
                setPosts(posts);
            
            });
        })

    }, [])
    return(
        <>
        {posts.length > 0 && posts.map(post => (
            <Post {...post}/>
        ))}

        </>
    )
}