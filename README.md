#Full-Stack Blogging Platform Documentation



Overview:
This document provides comprehensive documentation for the Full-Stack Blogging Platform. This platform allows users to create, edit, comment, and view blog posts. It supports user authentication with jwt and allows registration of accounts and login functionality.

Prerequisites:
Before running the project, ensure you have the following installed:

Node.js (v14.0 or higher recommended)
npm (Node Package Manager)
MongoDB (Local or cloud-based)
and also in your ide make sure that mongodb can be used. Vscode for example has an extension

Installation
Clone the repository:

git clone https://github.com/piran777/Full-Stack-Blogging-Platform.git
Navigate to the project directory:

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
Start the backend server:

cd api
nodemon index.js (make sure nodemon is installed
The API server will start on http://localhost:4000.

In a new terminal, start the frontend application:

cd client
yarn start

The client will start and open in your default web browser at http://localhost:3000.

Usage
After starting both the backend and frontend, you can use the platform as follows:

Register / Login: Use the registration form to create a new user account, or the login form to access the platform with an existing account. an example account is Username: Peter, Password: Peter (Note this is if you use my connected database. If it doesn't work then you will have to connect your own mongodb database)
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/8562d4d7-3463-4c2f-a6e3-9eaf93ca93d2)   ![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/7609e1cc-89d3-45fe-b0b6-c9f20e4428fd)

Make an account or login to the one I gave above (User: Peter, Pas: Peter) 



Creating Posts: Authenticated users can create new blog posts using the "Create Post" feature.
If you are not logged in your page will look like this and you won't be able to edit on any posts. You also won't be able to comment on any posts.
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/19c6bb75-ec80-4523-811c-a0a5f411cb43)


Once you log in you will have access to the features of creating posts, editing posts, and commenting on posts.
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/dff54eb4-a765-4131-a432-cb08d5748ae3)

Creating a post:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/b6a8a70e-9394-4d17-bd78-dcbcb1fe7ff0)

Fill out the fields and make sure to have a picture to use in your files:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/6dc67add-792b-476e-9e43-730e78efc27b)

We can then see the post is placed at the top of the blog with the author and time listed:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/f4fe6e67-9564-42d2-b5be-424f2b045047)

If you want to look at a blog post individually to edit or comment on, click on either the title or picture of the blog. This will take you to the blog page for that specific post. Once there, if you are the creator of the post, you can click the edit button. If you are not the creator the edit button does not appear:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/6344c96b-93f8-4b6b-9784-c0c22092ebb4)

It looks the same as the creation page. You just edit whatever text you want and even change the picture and it will update it on the page:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/1f4681ff-4290-405d-af15-b89bc075e389)

At the bottom are the tags and also the comments section:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/c7ddcade-a8b5-4967-b022-24aefc8da28d)

Here is an example of what comments on a post look like:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/d573c2e2-a8ac-4f84-abb1-8901ca9a8600)

More examples from different posts:
![image](https://github.com/piran777/Full-Stack-Blogging-Platform/assets/90805441/06385678-8723-448f-ae2c-9bd7de77b2c9)

