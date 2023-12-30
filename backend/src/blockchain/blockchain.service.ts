import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import Moralis from 'moralis';

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

const moralisOptions = {
  chains: ['0x13881'],
  description: 'Listen to UserAdded events',
  tag: 'UserRegistry',
  abi: contractABI,
  includeContractLogs: true,
  allAddresses: false,
  topic0: ['UserAdded(string,string,string)'],
  webhookUrl: 'https://www.example.com',
};

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  private signer: ethers.Signer;
  private streamId: string;

  constructor() {
    this.initializeMoralis();
    this.initializeEthers();
  }

  private async initializeMoralis() {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY }); // Replace with your Moralis API Key
    const stream = await Moralis.Streams.add(moralisOptions);
    console.log(`Moralis Stream created is : ${JSON.stringify(stream)}`);
  }

  private initializeEthers() {
    this.provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mumbai.infura.io/v3/358f5ae5bc804b81ad74ce87a3682743',
    );
    this.signer = new ethers.Wallet(process.env.PVT_KEY, this.provider);
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
    console.log(receipt);
    const userAddress = receipt.events?.[0].args?.[0];

    return { address: userAddress };
  }
}
