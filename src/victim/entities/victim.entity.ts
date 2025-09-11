import { TransformationStatus } from "src/common/enums/transformationStatus.enum";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('victim')
export class Victim {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text', {
        nullable: false,
        array: true,
    })
    skills: string[];

    @Column()
    lastSeen: string;

    @Column({
        type: 'enum',
        enum: TransformationStatus,
        default: TransformationStatus.PENDING,
    })
    status: TransformationStatus;

    @ManyToOne(() => User, (user) => user.victims)
    capturedBy: User;

}
