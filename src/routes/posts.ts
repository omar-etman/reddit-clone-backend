import express from 'express'
import {Request, Response} from 'express'
import Router from 'express'
import { User } from '../entities/user';
import {Post} from '../entities/post'
import { Tag } from '../entities/tag';

const router = express.Router();


//get posts
router.get('/', async (req, res) => {
    const posts = await Post.find({ // get the posts with the following relations confirmed --->
        relations: {
          author: true,
          comments: true,
          tags: true,
          reactions: true //(a post with an author, comments, tags & reactions)
        },
    });
    return res.json(posts);
})

//create post
router.post("/:authorId", async (req, res) => {
    const {authorId} = req.params; //get the author's id form the url
    const author = await User.findOneBy({id:+authorId}) // to use it and grab the author from the users data
    if(!author){
        res.json({msg:"that user does not exist"})// display that message if the user doesn't exist there
    }
    const {title, body, tags} = req.body // get the post's title, body & tags from the req passed from the frontend 

    const postTags = [] //have an empty array of tags ready to fill it with the postTags when you start creating it

    for (let i=0; i<tags.length; i++){ //go over the tags array that came from the frontend
        const tag = await Tag.findOneBy({id: tags[i].id}) // check each chosen tag are confirmed to exist on the tags database
        if(tag){ // if so ..
            postTags.push(tag) //push it to the empty array of postTags
        }
    }

    const post = Post.create({ //with the postTags array, the author we got from the database via userId & the req.body title & body, create a post instance from the entity
        title:title,
        body:body,
        author:author,
        tags:postTags
    })

    await post.save(); //save the created post
    return res.json(post); //respond by it
})

//updatePost

router.put("/update/:postId", async (req, res) => {
    const {postId} = req.params
    const post = await Post.findOneBy({id: +postId})
    const updatedPost = Post.update(post.id, {body: req.body})
    return res.json(updatedPost)
})

//deletePost
// router.delete("/delete/:userId/:postId", async (req, res) => {
//     const {postId, userId} =  req.params
//     // const user =  await User.findOneBy({id: +userId})
//     // const post = await Post.findOneBy({id: +postId})
//     const userConfirmed = await Post.findOneBy({
//         id: +postId,
//         author:{id: +userId}
//     })

//     if(userConfirmed)

// })

export {router as postsRouter}

