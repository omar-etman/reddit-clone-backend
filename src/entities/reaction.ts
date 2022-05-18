import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    
    ManyToOne,
} from "typeorm";
import { Post } from "./post";
import {User} from "./user"

@Entity("reaction")
export class Reaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => User, user => user.reactions
    )
    user : User

    @ManyToOne(
        () => Post, post => post.reactions
    )
    post : Post

    @Column()
    type: boolean


}