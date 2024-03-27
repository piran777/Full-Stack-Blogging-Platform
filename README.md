## Full-Stack Blogging Platform Documentation



## Overview:
This document provides comprehensive documentation for the Full-Stack Blogging Platform. This platform allows users to create, edit, comment, and view blog posts. It supports user authentication with jwt and allows registration of accounts and login functionality.

## Prerequisites:
Before running the project, ensure you have the following installed:

Node.js (v14.0 or higher recommended)
npm (Node Package Manager)
MongoDB (Local or cloud-based)
and also in your ide make sure that mongodb can be used. Vscode for example has an extension

## Installation
## Clone the repository:

git clone https://github.com/piran777/Full-Stack-Blogging-Platform.git

## Navigate to the project directory:

cd Full-Stack-Blogging-Platform

Install NPM packages for both frontend and backend. First, for the backend (cd into api):

cd api
npm install
Then, for the frontend:

cd ..
cd client
npm install
and yarn install


Running the Application

## Start the backend server:

cd api
nodemon index.js (make sure nodemon is installed
The API server will start on http://localhost:4000.

## In a new terminal, start the frontend application:

cd client
yarn start

The client will start and open in your default web browser at http://localhost:3000.

## Usage
After starting both the backend and frontend, you can use the platform as follows:

Register / Login: Use the registration form to create a new user account, or the login form to access the platform with an existing account. an example account is Username: Peter, Password: Peter (Note this is if you use my connected database. If it doesn't work then you will have to connect your own mongodb database)

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/8562d4d7-3463-4c2f-a6e3-9eaf93ca93d2)   ![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/7609e1cc-89d3-45fe-b0b6-c9f20e4428fd)

Make an account or login to the one I gave above (User: Peter, Pas: Peter) 



## Creating Posts: Authenticated users can create new blog posts using the "Create Post" feature.

If you are not logged in your page will look like this and you won't be able to edit on any posts. You also won't be able to comment on any posts.

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/19c6bb75-ec80-4523-811c-a0a5f411cb43)


Once you log in you will have access to the features of creating posts, editing posts, and commenting on posts.

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/dff54eb4-a765-4131-a432-cb08d5748ae3)

## Creating a post:

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/b6a8a70e-9394-4d17-bd78-dcbcb1fe7ff0)

## Fill out the fields and make sure to have a picture to use in your files:

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/6dc67add-792b-476e-9e43-730e78efc27b)

## We can then see the post is placed at the top of the blog with the author and time listed:

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/f4fe6e67-9564-42d2-b5be-424f2b045047)

## If you want to look at a blog post individually to edit or comment on, click on either the title or picture of the blog. This will take you to the blog page for that specific post. Once there, if you are the creator of the post, you can click the edit button. If you are not the creator the edit button does not appear:


![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/6344c96b-93f8-4b6b-9784-c0c22092ebb4)

## It looks the same as the creation page. You just edit whatever text you want and even change the picture and it will update it on the page:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/1f4681ff-4290-405d-af15-b89bc075e389)

## At the bottom are the tags and also the comments section:

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/c7ddcade-a8b5-4967-b022-24aefc8da28d)

## Here is an example of what comments on a post look like:

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/d573c2e2-a8ac-4f84-abb1-8901ca9a8600)

## More examples from different posts:

![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/06385678-8723-448f-ae2c-9bd7de77b2c9)




## Code:

## Backend:
We have some schema for the database. basically in the models folder we have 3 js files which are used to create the schema for the database. One is for keeping posts saved in the database to be displayed (Post.js in the models folder). The second model is for the users and making sure the information is kept in the database. Finally I made one for comments so that I could store and display comments:

 
## General Setup
Express: It is used to create a web server that can listen for HTTP requests.
CORS Middleware: Allows the server to accept requests from different origins, which is necessary during development since your front end might be served from a different server (like localhost:3000).
Mongoose: Provides a way to interact with MongoDB. It is used for creating data models and handling database operations.
bcryptjs: A library to hash passwords before storing them in the database, providing security against password theft.
jsonwebtoken (JWT): Used for authentication. It creates a signed token that securely represents the user's identity.
cookie-parser: Parses cookies attached to the client request object.
multer: Middleware for handling multipart/form-data, primarily used for uploading files.
fs (File System): A Node.js module to interact with the file system on the server.

## Database Connection
Connects to a MongoDB database using Mongoose. The connection string includes a username and password for authentication with the database.

## User Registration
POST /register: Allows new users to register. It receives a username and password, hashes the password, and creates a new user record in the database.

## User Login
POST /login: Authenticates users. It checks if the submitted password, after being hashed, matches the hash stored in the database. If successful, it creates a JWT and sends it back to the user as a cookie.

## User Profile
GET /profile: Returns user profile information. It reads the JWT from the cookies, verifies it, and sends back the user info if valid.

## User Logout
POST /logout: Logs out the user by clearing the token cookie.
Post Creation
POST /post: Handles creating new blog posts. It accepts title, summary, content, optional tags, and an image file. Tags are processed to ensure they are stored as an array. The image is saved to the server, and its path is stored in the post record.
Post Editing
PUT /post/:id: Updates an existing blog post. It requires the post's ID as a URL parameter. Only the author of the post can edit it, enforced by checking the JWT.
## Fetch Posts
GET /post: Retrieves a list of posts from the database, with a limit to prevent fetching too many records at once.
Fetch a Single Post
GET /post/:id: Retrieves a single post based on the provided ID.

## Comments
POST /post/:postId/comment: Allows users to comment on a post. It adds a new comment to the post's comments array.
GET /post/:postId/comments: Retrieves all comments for a specific post.

## Server Listening
Finally, the code ends with the app.listen function that starts the server on port 4000.
Each of these routes corresponds to an endpoint in the API, and each endpoint carries out a specific function necessary for the operation of a blogging platform, from user authentication to post and comment management.


## Front-end: 

## App.js:

This is the main React component that wraps your entire application. It uses Routes from react-router-dom to define the navigation and layout of your application. Each Route maps a path to a component. The UserContextProvider is a context provider that allows you to manage and access user information across the entire application.

## RegisterPage:

A component for the user registration page. It contains a form where a user can enter a username and password to register. Upon form submission, it sends a POST request to the server's /register endpoint.

## LoginPage:

A component for the login page. Similar to RegisterPage, but for logging in. After successful login, it sets the user info in the UserContext and redirects to the home page.

## PostPage:

A component that displays a single post. It fetches the post and its comments from the server based on the post ID. It also allows users to add comments if they are logged in.

## CreatePost:

A component where users can create a new post. It has inputs for title, summary, content, and tags. It also includes ReactQuill, a rich text editor for the post content, and handles file uploads.

## EditPost:

Similar to CreatePost, but for editing existing posts. It pre-populates the form with the post's current data, which it fetches based on the post ID.

## IndexPage:

The home page of the application. It displays a list of posts fetched from the server's /post endpoint.

## Header:

A header component displayed across the site. It includes navigation links and handles user login state, displaying options to create a new post or log out depending on whether the user is logged in.

## Layout:

A layout component that renders the Header and an Outlet for nested routes. The Outlet will render the appropriate page content based on the current route.

## CommentForm:

A form for submitting comments. It's included within the PostPage component to allow users to add comments to a post.

## Editor:

A reusable rich text editor component based on ReactQuill that can be used for creating and editing post content.

## UserContext:

This file defines a UserContext for managing the user's login state throughout the application, allowing you to check if the user is logged in and to access user information where needed.

## Post:

A component that represents an individual post in a list view. It displays the post's title, summary, and cover image, and links to the full post page.

These components collectively create a blogging platform where users can register, log in, create posts, edit their posts, and comment on others' posts. The application uses React's state management and context API to handle user authentication states and form submissions and leverages react-router-dom for navigation between different pages.


