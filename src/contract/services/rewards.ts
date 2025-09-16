import { ethers, parseEther, } from "ethers";
import { Address } from "viem";
import { rewardAbi } from "../abi/rewards";
import { OnchainUtilsService } from "./onchainUtils";
import { Erc20Service } from "./erc20Contract";
import { logger } from "@/src/lib/utils";


export class RewardsService {
    constructor(private readonly utils: OnchainUtilsService) { }

    contract(signer: ethers.Wallet) {
        return new ethers.Contract(this.utils.getContractAddress().rewards, rewardAbi, signer);
    }

    async claim(payload: { tokenAddress: Address, }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).claim(payload.tokenAddress,);
            logger.debug("Sender:", this.utils.wallet.address);
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err: " + this.utils.wallet.address, error)
        }
        return "";
    }

    async setRewardAmount(payload: { tokenAddress: Address, newAmount: number }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).setRewardAmount(payload.tokenAddress, parseEther(payload.newAmount.toString()));
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
            return "";
        }
    }
    async setAllowedToken(payload: { tokenAddress: Address, allowed: boolean }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).setRewardAmount(payload.tokenAddress, payload.allowed);
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
            return "";
        }
    }

    async setClaimInterval(payload: { newInterval: number }): Promise<string> {
        try {
            const tx = await this.contract(this.utils.wallet).setClaimInterval(payload.newInterval);
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
            return "";
        }
    }
    async withdrawTokens(payload: { tokenAddress: Address, amount: number, to: Address }): Promise<string | undefined> {
        try {
            const tx = await this.contract(this.utils.wallet).withdrawTokens(payload.tokenAddress, parseEther(payload.amount.toString()), payload.to);
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
            return undefined;
        }
    }
    async depositTokens(payload: { tokenAddress: Address, amount: number }): Promise<string | undefined> {
        const amt = parseEther(payload.amount.toString())
        const contractAddr = this.utils.getContractAddress().rewards
        try {
            const erc20 = new Erc20Service(this.utils.wallet, payload.tokenAddress)
            logger.debug("Initiating Wallet: " + this.utils.wallet.address);
            logger.debug("Before Approve: " + contractAddr);

            await erc20.balanceOf(this.utils.wallet.address as Address);

            await erc20.approve(amt, contractAddr as Address)

            logger.debug("Before Contract deposit");
            // const tx = await this.contract(this.utils.wallet).depositTokens(payload.tokenAddress, parseEther(payload.amount.toString()));
            const contract = this.contract(this.utils.wallet)

            logger.debug("Before deposit");
            // const tx = await contract.depositTokens(payload.tokenAddress, amt);
            const tx = await contract.depositTokens(payload.tokenAddress, parseEther("0.1"));

            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
            return undefined;
        }
    }
    
    async nextClaimTime(payload: { tokenAddress: Address, }): Promise<string | undefined> {
        try {
            const tx = await this.contract(this.utils.wallet).nextClaimTime();
            logger.debug("Transaction sent:", tx.hash);
            payload

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
        }
    }
    async nextClaimTimeFor(payload: { tokenAddress: Address, user: Address }) {
        try {
            const tx = await this.contract(this.utils.wallet).nextClaimTimeFor(payload.user, payload.tokenAddress);
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
        }
    }
    async canClaim(payload: { tokenAddress: Address, }): Promise<boolean | undefined> {
        try {
            const tx = await this.contract(this.utils.wallet).canClaim(payload.tokenAddress);
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
        }
    }
    async canClaimFor(payload: { tokenAddress: Address, user: Address }): Promise<string | undefined> {
        try {
            const tx = await this.contract(this.utils.wallet).canClaimFor(payload.user, payload.tokenAddress);
            logger.debug("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            logger.debug("Transaction mined:", receipt.transactionHash);
            return receipt.transactionHash;

        } catch (error) {
            logger.error("Txn err:", error)
        }
    }
}