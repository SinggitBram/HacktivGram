const { Post } = require('../models')

class PostControl {
    static getPost(req, res) {
        Post.findAll({
            where: { UserId: req.userdata.id } // to check the name of req.userdata in authentication or include in authority
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getPostId(req, res) {
        Post.findOne({
            where: { id: req.params.id }
        })
            .then(data => {
                if (data.UserId !== req.userdata.id) {
                    res.status(400).json('not your post') // check if include in authority
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static addPost(req, res) {
        console.log('masuk post control')
        let statuspost
        if (req.body.origin_userid) { //repost
            statuspost = false
        } else {
            statuspost = true //original post
        }
        let newpost = {
            title: req.body.title,
            image_url: req.body.image_url,
            views: req.body.views,
            location: req.body.location,
            UserId: req.userdata.id, // check the name userdata in authentication
            status: statuspost,
            origin_userid: req.body.origin_userid
        }
        Post.create(newpost)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static editPost(req, res) {
        Post.findOne({
            where: { id: req.params.id }
        })
            .then(data => {
                if (data.UserId !== req.userdata.id) {
                    res.status(400).json('not your post') // check if include in authority
                } else {
                    return Post.update(req.body, {
                        where: { id: req.params.id }
                    })
                }
            })
            .then(data => {
                res.status(200).json(`data with id ${req.params.id} has been updated`)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static deletePost(req, res) {
        Post.findOne({
            where: { id: req.params.id }
        })
            .then(data => {
                if (data.UserId !== req.userdata.id) {
                    res.status(400).json('not your post') // check if include in authority
                } else {
                    return Post.destroy({
                        where: { id: req.params.id }
                    })
                }
            })
            .then(data => {
                res.status(200).json(`data with id ${req.params.id} has been deleted`)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = PostControl