const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

//Getting all the posts
router.get('/my-posts', async (req, res) => {
    try {
      const posts = await Post.find({ user: req.query.user });
    //   console.log(posts)
      res.json(posts);
    } catch (error) {
      console.log('Error in fetching posts by user ID', error);
      res.status(500).json({ message: 'Error in fetching posts', error });
    }
  });

router.get('/', async(req, res) => {
    try {
        const post = await Post.find();
        res.json(post)
    } catch (error) {
        console.log('error in getting all posts', error);
        res.json(500).json({message: 'Error in getting all the posts', error})
    }
})

router.get('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post)
    } catch (error) {
        console.log('error in getting post by id', error);
        res.json(500).json({message: 'Error in getting all the posts', error})
    }
})

//Posting a post
router.post('/add-post', async (req, res) => {
    try {
        const {title, content, author, timeStamp, userId, categoryId} = req.body;
        const post = new Post({title, content, author, timeStamp, user:userId, category:categoryId });
        await post.save();
        // console.log(post);
        res.status(201).json({message: 'Post has been created'})
    } catch (error) {
        console.log('creating post error', error);
        res.status(500).json({message: 'Error in creating post', error})   
    }
})

//Updating the post by id
router.patch('/update-post/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,{...req?.body});
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        res.status(201).json({message: 'Post has been updated'})
    } catch (error) {
        console.log('updating post error', error);
        res.status(500).json({message: 'Error in updating post', error})
    }
})

//Deleting the post by id
router.delete('/delete-post/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id,{...req?.body});
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        res.status(201).json({message: 'Post has been deleted'})
    } catch (error) {
        console.log('deleting post error',error);
        res.status(500).json({message: 'Error in deleting post', error})
    }
})

// Like a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.likes += 1;
        await post.save();
        res.json(post);
        // console.log('like', post);
    } catch (error) {
        console.log('in like', error)
        res.status(500).json({ message: 'Error liking the post', error });
    }
});

// Add a comment to a post
router.post('/:id/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post.comments) {
            post.comments = [];
        }

        const newComment = {
            username: req.body.username,
            text: req.body.text,
            timestamp: new Date()
        };

        post.comments.push(newComment);
        await post.save();
        res.json(post);
    } catch (error) {
        console.log('Error in posting comment', error);
        res.status(500).json({ message: 'Error adding comment', error });
    }
});



module.exports = router;