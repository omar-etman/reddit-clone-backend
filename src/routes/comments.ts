import express from 'express'
import {Request, Response} from 'express'
import {Comment} from '../entities/comment'
import {User} from '../entities/user'
import {Post} from '../entities/post'
import {Router} from 'express'

const router = express.Router();

//get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find({
        relations: {
        author: true,
        post: true,
        },    
    });
    return res.json(comments);
})

//create a comment
router.post('/create/:postId/:authorId', async (req, res) => {
    const {authorId, postId} = req.params
    const post = await Post.findOneBy({id: +postId})
    const author = await User.findOneBy({id: +authorId})
    const {body} = req.body
    const comment = Comment.create({
        post,
        author,
        body
    })

    await Comment.save(comment)
    return res.json(comment)
})

//delete a comment

//edit a comment
router.put("/edit/:commentId", async (req, res) => {
    const {commentId} = req.params
    const {body} = req.body
    // const comment = await Comment.findOneBy({id:+commentId})
    const editedComment = Comment.update(+commentId, {body:body})
    return res.json(editedComment)
})

export { router as commentsRouter}