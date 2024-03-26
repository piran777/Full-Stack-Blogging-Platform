import './App.css';
import { Link } from 'react-router-dom'; {/*  Use Link from react-router-dom instead of <a></a>  */}
export default function Header(){

    return(
        <header>

        <Link to = "/" className  = "logo">myBlog</Link>
        <nav>
          <Link to="/login">Login</Link> 
          <Link to="/register">Register</Link> 
        </nav>



      </header>
    );


}