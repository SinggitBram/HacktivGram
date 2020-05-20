
const { Comment, User } = require('../models')
require('dotenv').config()

class CommentController {
    static addComment(req, res) {
        let newComment = {
            UserId: req.userdata.id,
            PostId: req.body.PostId,
            comment: req.body.comment
        }
        Comment.create(newComment)
            .then(result => {
                res.status(201).json({ message: 'Success added a new comment', comment: newComment })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }

    static getComment(req, res) {
        let PostId = Number(req.body.PostId)
        Comment.findAll({ where: { PostId }, include: User })
            .then(result => {
                const bulkCommentsAndCommenters = []
                for (let i = 0; i < result.length; i++) {
                    bulkCommentsAndCommenters.push({ commentId: result[i].id, comment: result[i].comment, commenter: result[i].User.name })
                }
                res.status(200).json({ message: 'success retrieved comment and commenters', pasangan: bulkCommentsAndCommenters })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }

    static editComment(req, res) {
        let id = Number(req.params.id)
        let editComment = req.body.editComment

        Comment.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    res.status(404).json({ status: 404, message: `comment not found` })

                } else {
                    return Comment.update({ comment: editComment }, { where: { id } })
                }
            })
            .then(result => {
                res.status(200).json({ message: 'success edited a comment' })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }

    static deleteComment(req, res) {
        let id = Number(req.params.id)
        Comment.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    res.status(404).json({ status: 404, message: `comment not found` })
                } else {
                    return Comment.destroy({ where: { id } })
                }
            })
            .then(result => {
                res.status(200).json({ message: 'success deleted a comment' })
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, error: err })
            })
    }
}

module.exports = CommentController