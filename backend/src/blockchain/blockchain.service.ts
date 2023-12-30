import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

const contractABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'phone',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'addUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'phone',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'UserAdded',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'getUser',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'email',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'phone',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
        ],
        internalType: 'struct UserRegistry.User',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mumbai.infura.io/v3/358f5ae5bc804b81ad74ce87a3682743',
    );
    this.signer = new ethers.Wallet(
      '30795dd9cb041f09a52bc664a51dde47ec87341eee57d6cb527c3b778fc0d37f',
      this.provider,
    );
    this.contract = new ethers.Contract(
      '0x80D31f5FE4Ec2675E61c92852a4C56b6B909eF91',
      contractABI,
      this.signer,
    );
  }

  async registerUser(userData: {
    name: string;
    email: string;
    phone: string;
  }): Promise<{ address: string }> {
    const transaction = await this.contract.addUser(
      userData.email,
      userData.phone,
      userData.name,
    );
    const receipt = await transaction.wait();

    // Assuming the transaction receipt contains the address of the new user
    const userAddress = receipt.events?.[0].args?.[0];

    return { address: userAddress };
  }
}
