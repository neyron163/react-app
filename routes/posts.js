const express = require('express');
const router = express.Router();
const multer = require('multer');

const validatePost = require('../validation/post');

const Post = require('../models/Posts');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

router.post('/post', upload.single('image'), function(req, res) {
    console.log(upload)
    const request = req.body;

    console.log(req)

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
        res.send(arr.reverse())
    })
});

router.post('/delete/post', function(req, res) {
    const ID = req.body.id;
    
    Post.findByIdAndDelete(ID, () => {
    }).then(() => {
      Post.find(function(err, arr){
        res.send(arr.reverse())
      })
    })
});


module.exports = router;