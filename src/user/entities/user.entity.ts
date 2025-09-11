import { UserRole } from "src/common/enums/roles.enum";
import { Victim } from "src/victim/entities/victim.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    username: string;

    @Column('text')
    password: string;
 
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.DEVELOPER
    })
    roles: UserRole;

    @OneToMany(() => Victim, (victim) => victim.capturedBy)
    victims: Victim[];
}
