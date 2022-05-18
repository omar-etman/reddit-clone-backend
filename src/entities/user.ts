import { Entity, PrimaryGeneratedColumn, Column ,BaseEntity,OneToMany } from "typeorm"
import { Post } from './post'
import{Comment} from './comment'
import { Reaction } from "./reaction"
@Entity("user")
    
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @OneToMany(
        () => Post,
        post=> post.author
    )
    posts: Post[]
        
    @Column()
    lastName: string

    @OneToMany(
        () => Comment,
        post=> post.author
    )
    comments:Comment[]

    @OneToMany(
        () => Reaction,
        post=> post.user
    )
    reactions :Reaction[]
}

