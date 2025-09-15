import { ethers, parseEther } from "ethers";
import { Address, erc20Abi } from "viem";


// @Injectable()
export class Erc20Service {
    contract: ethers.Contract 

    constructor(private readonly wallet: ethers.Wallet, private readonly contractAddress: Address) {
        this.contract = new ethers.Contract(this.contractAddress, erc20Abi, this.wallet);
    }

    async approve(amount: bigint, contractToApprove: Address): Promise<string> {
        const txn = await this.contract.approve(contractToApprove, parseEther(amount.toString()))
        const receipt = await txn.wait();
        return receipt.transactionHash
    }

    async transfer(to: Address, amount: number): Promise<string> {
        const txn = await this.contract.transfer(to, parseEther(amount.toString()))
        const receipt = await txn.wait();
        return receipt.transactionHash
    }

    async transferFrom(to: Address, from: Address, amount: number): Promise<string> {
        const txn = await this.contract.transfer(from, to, parseEther(amount.toString()))
        const receipt = await txn.wait();
        return receipt.transactionHash
    }

    async balanceOf(address: Address): Promise<string> {
        const balance = await this.contract.balanceOf(address)
        console.log("Wallet Balance:", balance)
        return balance
    }
}