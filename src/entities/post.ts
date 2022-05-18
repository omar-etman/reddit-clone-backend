import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
    UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Tag } from "./tag";
import { Comment } from "./comment";
import { Reaction } from "./reaction";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;
  @UpdateDateColumn({ type: "timestamp" })
  date_updated: Date;

  @ManyToOne(() => User, (author) => author.posts, { nullable: false })
  @JoinColumn({
    name: "author_id",
  })
  author: User;

  @ManyToMany(() => Tag , tag => tag.posts,{cascade: true})
  tags: Tag[]
    
  @OneToMany(
    () => Comment,
    comment=> comment.post
  )
  comments:Comment[]

  @OneToMany(
    () => Reaction, reaction => reaction.post
  )
  reactions: Reaction []
}


