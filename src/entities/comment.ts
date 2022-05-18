import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    
    ManyToOne,
} from "typeorm";
import { Post } from "./post";
import {User} from "./user"
  
@Entity("comment")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  body: string

  @ManyToOne(() => User, (author) => author.comments ,{nullable:false})
  
  author: User;


  @ManyToOne(() => Post, (post) => post.comments ,{nullable:false})
  
  post:Post;
}