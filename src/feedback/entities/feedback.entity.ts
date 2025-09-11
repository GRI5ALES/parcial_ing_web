import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('feedback')
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    message: string;

    @Column()
    author: string;

    @CreateDateColumn()
    createdAt: Date;
}
