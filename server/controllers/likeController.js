const { Likes, User } = require('../models')

class LikeController {
    static addLike(req, res){
        let newdata = {
            UserId : req.userdata.id,
            PostId : Number(req.body.PostId)
        }
        console.log(newdata, "newdata")
        Likes.findAll({
            where: {UserId : newdata.UserId, PostId: newdata.PostId}
        })
        .then(result=>{
            if(result.length>0){
                console.log("--------rerer")
                let deleteId = result[0].dataValues.id
                // res.status(400).json({"msg sudah ada": result})
                console.log(deleteId, "params-----")
                return Likes.destroy({
                    where: {id: deleteId}
                })
            } else {
                return Likes.create(newdata)
            }
        })        
        .then(data=>{
            console.log(data)
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
        console.log(req.params.id, "dletel params")
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