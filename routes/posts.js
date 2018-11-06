const express = require('express');
const router = express.Router();
const validatePost = require('../validation/post');

const Post = require('../models/Posts');

router.post('/post', function(req, res) {
    const request = req.body;

    const { errors, isValid } = validatePost(request);

    if(!isValid) {
        return res.status(400).json(errors);
    }

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


router.get('/posts', function(req, res) {
    Post.find(function(err, arr){
        res.send(arr)
    })
});

router.post('/delete/post', function(req, res) {
    const ID = req.body.id;
    
    Post.findByIdAndDelete(ID, () => {
        res.send(true)
    })
});


module.exports = router;