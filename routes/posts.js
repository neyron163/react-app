const express = require('express');
const router = express.Router();
const validatePost = require('../validation/post');

const Post = require('../models/Posts');

router.post('/post', function(req, res) {
    const request = req.body;

    // validatePost(request)
    const Article = new Post({
        title: request.title,
        description: request.description,
        image: request.image,
        likes: request.likes
    });
    Article.save().then(function() {
        res.json(Article)
    });
});


router.post('/posts', function(req, res) {
    Post.find(function(err, arr){
        res.send(arr)
    })
});


module.exports = router;