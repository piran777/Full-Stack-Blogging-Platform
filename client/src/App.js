import './App.css';
import Header from "./Header";
import Post from "./Post";
import Layout from "./Layout";
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/indexPage';
import LoginPage from './pages/LoginPage';
import CreatePost from './pages/CreatePost';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>


    <Routes>
      <Route path = "/" element = {<Layout />}> 
      <Route index element={ 
          <IndexPage />
      } />
      <Route path = {"/login"} element = {
        <LoginPage />
          
      }/>

      <Route path = {"/register"} element = {
        <RegisterPage />
          
      }/>


      <Route path = {"/create"} element = {
        <CreatePost />
          
      }/>
   
    </Route>
    
    </Routes>
    </UserContextProvider>
  );
}

export default App;
