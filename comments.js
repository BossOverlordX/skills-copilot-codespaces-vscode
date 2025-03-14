// Create web server

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(comments);
        }
    });
});

router.post('/comments', (req, res) => {
    const { name, email, comment } = req.body;

    if (!name || !email || !comment) {
        res.status(400).send('Name, email, and comment are required');
    }

    const newComment = new Comment({
        name,
        email,
        comment
    });

    newComment.save((err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(comment);
        }
    });
});

module.exports = router;