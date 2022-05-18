import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { postsRouter } from './routes/posts';
import { commentsRouter } from './routes/comments';
import { usersRouter } from './routes/users';
import { reactionsRouter } from './routes/reactions';
import AppDataSource from './data-source'
dotenv.config()

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/', function (req:Request,res:Response) {
    res.send('Hello World' )

})
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/users',usersRouter)
app.use('/reactions',reactionsRouter)

app.listen(process.env.PORT, async () => {
    
    await AppDataSource.initialize()
    console.log ("connected to DB")
  });