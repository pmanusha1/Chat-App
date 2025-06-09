import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(username: string, password: string, avatarUrl: string) {
    const newUser = new this.userModel({ username, password, avatarUrl });
    return newUser.save();
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  findAll() {
    return this.userModel.find().select('-password');
  }

  search(query: string) {
    return this.userModel
      .find({ username: new RegExp(query, 'i') })
      .select('-password');
  }
}
