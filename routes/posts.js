const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const find = require('find');

const validatePost = require('../validation/post');

const Post = require('../models/Posts');

let hashName;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        hashName = '_' + Math.random().toString(36).substr(2, 9) + '.jpg';
        cb(null, hashName);
    }
})
const upload = multer({ storage: storage });

router.post('/post', upload.single('image'), function (req, res) {
    const request = JSON.parse(req.body.text)[0];

    const { errors, isValid } = validatePost(request);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.find({}, function (err, articles) {

        const Article = new Post({
            title: request.title,
            description: request.description,
            image: hashName,
            likes: request.likes
        });

        Article.save().then(function () {
            res.json(Article)
        });

    });

});


router.get('/posts', function (req, res) {
    Post.find(function (err, arr) {
        res.send(arr)
    });
});

router.post('/delete/post', function (req, res) {
    const ID = req.body.id;
    Post.findById(ID, (err, el) => {
        find.file('public/images/', (files) => {
            for (let i = 0; i < files.length; i++) {
                if (typeof files[i].match(el.image)) {
                    fs.unlink('public/images/' + el.image, (err) => { })
                }
            }
        })
    }).then(() => {
        Post.findByIdAndDelete(ID, (el) => { }).then(() => {
            Post.find(function (err, arr) {
                res.send(arr)
            });
        });

    });
});

module.exports = router;