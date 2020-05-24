require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')
const followRouter = require('./routes/followRouter')
const likeRouter = require('./routes/likeRouter')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users' , userRouter)
app.use('/posts' , postRouter)
app.use('/comments' , commentRouter)
app.use('/follows', followRouter)
app.use('/likes', likeRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app