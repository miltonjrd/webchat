import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { repositories } from "src/constants";
import * as bcrypt from 'bcrypt';

import { User } from "./user.entity";
import { CreateUserDto } from "src/dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @Inject(repositories.USER_REPOSITORY)
        private userRepository: Repository<User>
    ) {}

    async findAll() {
        const users = await this.userRepository.find();

        return users.map((user) => {
            const { password, ...newUser} = user;
            return newUser;
        });
    }

    async create({ name, email, password }: CreateUserDto) {
        const salt = await bcrypt.genSalt(10);

        const user: User = new User();
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, salt);

        await this.userRepository.save(user);
    }

    async findByName(name: string) {
        const user = await this.userRepository.findOneBy({
            name
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOneBy({
            email
        });

        return user;
    }

    async findById(id: number) {
        const user = await this.userRepository.findOneBy({
            id
        });

        return user;
    }
}