import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash} from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
      private readonly userRepository:Repository<User>
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const exist = await this.userRepository.findOne({where: {username: createUserDto.username}})
      if (exist) {
        throw new ConflictException("el username ya existe");
      }

      const user = this.userRepository.create({
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      })
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async findAll() {
    let users = await this.userRepository.find({});
    return users;
  }

  async findOne(id: string) {
    const user = this.userRepository.findOneBy({id: id})

    if(!user){
      throw new NotFoundException(`el user con el id: ${id} no existe`)
    }

    return user;
  }

  async findByUsername(username: string): Promise<User>{
    const user = await this.userRepository.findOneBy({username: username});

    if(!user){
      throw new NotFoundException(`el usuario con el username: ${username} no existe`)
    }
    return user;
  }

  async validatePassword(user: User, plain: string): Promise<boolean>{
    return await compare(plain, user.password);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload(
      {id:id, ...updateUserDto}
    )

    if(!user){
      throw new NotFoundException(`el user con el id: ${id} no existe`)
    }

    this.userRepository.save(user)
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({id: id});

    if(!user){
      throw new NotFoundException(`el user con el id: ${id} no existe`)
    }

    this.userRepository.delete({id:id});
    return user;
  }
}
