import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const { token } = userInfo;  // Assuming you store the token here
  useEffect(() => {
    if (token) { 
      fetch('http://34.130.156.109:4000/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        credentials: 'include',
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        return response.json();
      })
      .then(data => {
        setUserInfo({ ...userInfo, details: data });
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        // Optionally handle error state in UI here
      });
    }
  }, [token, setUserInfo]);
  

  function logout(event) {
    event.preventDefault();
    fetch('http://34.130.156.109:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    });
  }
  

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}