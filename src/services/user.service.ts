import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
    userService: any;
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async create(username: string, password: string): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({ username, password: hashedPassword });
        return createdUser.save();
    }

    async findByUsername(username: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ username });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userService.validateUser(payload.username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
