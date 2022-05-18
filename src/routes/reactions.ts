import express from 'express'
import {Request, Response} from 'express'
import Router from 'express'
import { User } from '../entities/user';
import{Post} from '../entities/post'
import { Reaction } from '../entities/reaction';

const router = express.Router();

router.post('/:userId/:postId', async (req,res) => {
    const {userId, postId} = req.params;
    const {body} = req.body; //frontend has to construct an object {body: true/false}, the key is refered to in this line
    const user = await User.findOneBy({ id: parseInt(userId) }) // to construct the reaction
    const post = await Post.findOneBy({ id: parseInt(postId) }) 
    const reactedPreviously = await Reaction.findOneBy({
        user: {id: +userId}, //relations has to be drilled through hence the {} -- match the id within the user relation in the reaction entity
        post: {id: +postId} 
    })
    
    if(reactedPreviously){
        const reaction = await Reaction.update(reactedPreviously.id, {type: body})
        return res.status(200).json({msg: 'your reaction has been changed efra7'})
    }
    const newReaction = Reaction.create({
            type:body,
            post,
            user
    })
    await newReaction.save()
    return res.json(newReaction)
})

export {
    router as reactionsRouter
}