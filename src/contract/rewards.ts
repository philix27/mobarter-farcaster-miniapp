import { ethers, parseEther, } from "ethers";
import { Address } from "viem";
import { Injectable, } from "@nestjs/common";
import { OnchainUtilsService, SupportedChains } from "./onchainUtils";
import { rewardAbi } from "../abi/rewards";
import { Erc20Service } from "./erc20Contract";


@Injectable()
export class RewardsService {
    constructor(private readonly utils: OnchainUtilsService) { }

    contract(signer: ethers.Wallet) {
        return new ethers.Contract(this.utils.getContractAddress().rewards, rewardAbi, signer);
    }

    async claim(payload: { tokenAddress: Address, }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).claim(payload.tokenAddress,);
            console.log("Sender:", this.utils.wallet.address);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err: " + this.utils.wallet.address, error)
        }
    }

    async setRewardAmount(payload: { tokenAddress: Address, newAmount: number }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).setRewardAmount(payload.tokenAddress, parseEther(payload.newAmount.toString()));
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
    async setAllowedToken(payload: { tokenAddress: Address, allowed: boolean }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).setRewardAmount(payload.tokenAddress, payload.allowed);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }

    async setClaimInterval(payload: { newInterval: number }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).setClaimInterval(payload.newInterval);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
    async withdrawTokens(payload: { tokenAddress: Address, amount: number, to: Address }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).withdrawTokens(payload.tokenAddress, parseEther(payload.amount.toString()), payload.to);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
    async depositTokens(payload: { tokenAddress: Address, amount: number }): Promise<string> {
        const amt = parseEther(payload.amount.toString())
        const contractAddr = this.utils.getContractAddress().rewards
        try {
            const erc20 = new Erc20Service(this.utils.wallet, payload.tokenAddress)
            console.log("Initiating Wallet: " + this.utils.wallet.address);
            console.log("Before Approve: " + contractAddr);

            await erc20.balanceOf(this.utils.wallet.address as Address);

            await erc20.approve(amt, contractAddr as Address)

            console.log("Before Contract deposit");
            // const tx = await this.contract(this.utils.wallet).depositTokens(payload.tokenAddress, parseEther(payload.amount.toString()));
            const contract = this.contract(this.utils.wallet)

            console.log("Before deposit");
            // const tx = await contract.depositTokens(payload.tokenAddress, amt);
            const tx = await contract.depositTokens(payload.tokenAddress, parseEther("0.1"));

            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
    async nextClaimTime(payload: { tokenAddress: Address, }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).nextClaimTime();
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
    async nextClaimTimeFor(payload: { tokenAddress: Address, user: Address }) {
        try {
            const tx = await this.contract(this.utils.wallet).nextClaimTimeFor(payload.user, payload.tokenAddress);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
    async canClaim(payload: { tokenAddress: Address, }): Promise<boolean> {
        try {
            const tx = await this.contract(this.utils.wallet).canClaim(payload.tokenAddress);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
    async canClaimFor(payload: { tokenAddress: Address, user: Address }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).canClaimFor(payload.user, payload.tokenAddress);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            console.error("Txn err:", error)
        }
    }
}