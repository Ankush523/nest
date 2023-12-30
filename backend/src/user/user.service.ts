import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BlockchainService } from '../blockchain/blockchain.service';

interface QueryParams {
  page?: string;
  keyword?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private blockchainService: BlockchainService,
  ) {}

  async findAll(query: QueryParams): Promise<User[]> {
    const resPerPage = 3;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const users = await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return users;
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async registerUser(userData: {
    name: string;
    email: string;
    phone: string;
  }): Promise<User> {
    const blockchainResponse = this.blockchainService.registerUser(userData);

    const newUser = new this.userModel({
      ...userData,
      address: (await blockchainResponse).address,
    });
    return await newUser.save();
  }
}
