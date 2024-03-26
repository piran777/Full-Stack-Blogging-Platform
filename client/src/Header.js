import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(userInfo => {
      setUsername(userInfo.username); // Set the username from the backend here
    })
    .catch(err => console.error(err)); // Always good to catch potential errors
  }, []); // The empty array ensures this effect runs only once after the initial render

  function logout(){ //invalidate cookie
    fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
    })

  }

  return (
    <header>
      <Link to="/" className="logo">myBlog</Link>
      <nav>
        {username ? (
          // If we have a username, display a page that says "Create post" instead of the login and register options
          <>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}> Logout</a>
          </>
        ) : (
          // If not logged in, show login and register options
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
