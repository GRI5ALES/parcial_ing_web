import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('reward')
export class Reward {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

   @ManyToOne(() => User, {nullable: false})
   assignedTo: User;

   @CreateDateColumn()
   assignedAt: Date;
}
