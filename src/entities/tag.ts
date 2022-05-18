import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinTable,
    ManyToMany,

} from "typeorm";
import {Post} from "./post"
  
@Entity("tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  title: string

    @ManyToMany(() => Post, post => post.tags)
    @JoinTable({
        name: "postTag",
        joinColumn: {
            name: "tag",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "post",
            referencedColumnName: "id"
        }
    })
  
  posts: Post[];

}