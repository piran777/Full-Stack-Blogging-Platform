const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //authentication
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const Post = require('./models/Post'); // Adjust the path as needed
const uploadMiddleware = multer({dest: 'uploads/'});
const salt = bcrypt.genSaltSync(10); //generate salt with bcrypt.
const secret = "x67gfh78o99lkljlfxd356dg"; //use hardcoded here because its easier with jwt to do that way and its also best practice
const app = express();
const User = require('./models/User');
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
//need the above in cors for my crednetials to work (cookies)
app.use(express.json());

app.use(cookieParser());

//async
mongoose.connect('mongodb+srv://piranaminullah:dN246Tvt5wjIA4GH@cluster0.bvqugh7.mongodb.net/');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password: bcrypt.hashSync(password, salt) }); //Here we create a user in our database with the user input
        res.json(userDoc); //use a salted and encryped password using bcrypt
    } catch (error) {
        // If there's an error, send back a 400 or 500 error with the message
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username})
    //after we find username from database we want to compare the password typed with the user from the account find username
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        //logged in
        jwt.sign({username, id: userDoc._id}, secret, {}, (err,token)=>{

            if(err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            }); // here if our response is 200 ok then we use cookies to keep the user with correct credentials logged in 
           
        });
    }
    else{
        res.status(400).json('Incorrect Password or Username')
    }

});


app.get('/profile' , (req,res) =>{ //endpoint for checking cookies and being logged in
    //fetched in header.js
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info)=>{
        if (err) throw err;
        res.json(info)
    });
});


app.post('/logout', (req,res) =>{
    res.cookie('token', '').json('ok');
});


app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath, //our path to file/image
        author:info.id,
      });
      res.json(postDoc);
    });
  
  });

  app.get('/post',async  (req,res) => {
    const posts = await Post.find();
    res.json(posts);
  } )

app.listen(4000);