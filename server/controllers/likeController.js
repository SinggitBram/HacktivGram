const { Likes, User } = require('../models')

class LikeController {
    static addLike(req, res){
        let newdata = {
            UserId : req.userdata.id,
            PostId : Number(req.body.PostId)
        }
        console.log(newdata, "newdata")
        Likes.create(newdata)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static getLike(req, res){
        let PostId = req.params.PostId
        Likes.findAll({
            where: {PostId},
            include: [{model: User}]
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static deleteLike(req, res){
        Likes.destroy({
            where: {id: req.params.id}
        })
        .then(data=>{
            res.status(200).json({message: `like with id ${req.params.id} has been deleted`})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = LikeController