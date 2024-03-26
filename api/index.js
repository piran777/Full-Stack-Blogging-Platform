const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const bcrypt = require('bcryptjs');


const salt = bcrypt.genSaltSync(10); //generate salt with bcrypt.
const app = express();
const User = require('./models/User');
app.use(cors());

app.use(express.json());

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


app.listen(4000);