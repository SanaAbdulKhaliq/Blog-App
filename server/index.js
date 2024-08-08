const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const categoryRoute = require('./routes/categoryRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/category', categoryRoute)

mongoose.connect('mongodb://127.0.0.1:27017/blog-post')
.then(async() => {
  console.log('MongoDB is connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.get('/post', (req, res) => {
    res.send('Server is running on port 4000')
})

app.listen(4000, (req, res) => {
    console.log('Server is running on port 4000')
})