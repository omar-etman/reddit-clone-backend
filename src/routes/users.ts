import express from 'express'
import {Request, Response} from 'express'
import Router from 'express'
import {User} from '../entities/user'

const router = express.Router();

//fetch all users
router.get('/', async (req, res) => {
    const users = await User.find({
        relations: {
            comments: true,
            posts: true,
        },
    });
    return res.json(users);
})

//create user
router.post('/', async (req, res) => {
    const {firstName, lastName} = req.body;
    const user = User.create({
        firstName: firstName,
        lastName: lastName,
    });
    await user.save()
    return res.json (user)
});

//delete user

export {router as usersRouter}