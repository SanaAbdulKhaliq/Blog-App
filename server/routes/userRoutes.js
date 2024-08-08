const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const {hashPassword, comparePassword} = require('../helper/auth');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user)
    } catch (error) {
        res.status(500).json({message: 'Error in getting users', error})
    }
})

//Registering the user
router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //Check if name is entered
        if(!username){
            return res.json({error: 'Username is required'})
        }

        //Check if password is entered
        if(!password){
            return res.json({error: 'Password is required'})
        }

        //Check if email is already exists
        const exists = await User.findOne({email});
        if(exists){
            return res.json({error: 'Email is already taken'})
        }

        const hashedPassword = await hashPassword(password);

        //Creating the user
        const user = await User.create({
            username, 
            email, 
            password:hashedPassword
        });
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
})

//Login User Credientials
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({error: 'No User found'})
        }

        //Check if password matches
        const match = await comparePassword(password, user.password);
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                console.log('token', token);
                res.cookie('token', token).json({user: user, token: token})
            })
        }
        if(!match){
            res.json({error: 'Password do not match'})
        }
    } catch (error) {
        console.log(error);
        res.json({message: 'Something went wrong', error})
    }
})

//Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token', {path: '/logout'});
    res.status(200).json({message: 'Logged out Successfully'})
})

module.exports = router;