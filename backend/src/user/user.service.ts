import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private blockchainService: BlockchainService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
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

    // Assuming blockchainResponse contains the Ethereum address of the new user
    const newUser = new this.userModel({
      ...userData,
      address: (await blockchainResponse).address,
    });
    return await newUser.save();
  }
}
