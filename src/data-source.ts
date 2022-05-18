import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment } from './entities/comment';
import {Post} from './entities/post'
import { Tag } from './entities/tag';
import { User } from './entities/user';
config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Post,User,Tag, Comment],
  migrations: ['migration/*.ts'],
  subscribers: []
});





    export default AppDataSource