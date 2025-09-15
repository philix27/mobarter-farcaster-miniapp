import { ethers, } from "ethers";
import { TXN_MANAGER_ABI } from "../abi/abi.txnManager";
import { Address, parseEther } from "viem";
import { Injectable, } from "@nestjs/common";
import { OnchainUtilsService } from "./onchainUtils";
import { Erc20Service } from "./erc20Contract";


// @Injectable()
export class TxnManagerService {

    constructor(private readonly utils: OnchainUtilsService) { }

    contract(signer: ethers.Wallet) {
        return new ethers.Contract(this.utils.getContractAddress().txnManager, TXN_MANAGER_ABI, signer);
    }

    async pay(payload: { tokenAddress: Address, amount: number, txName: string, info: string }) {
        const amt = parseEther(payload.amount.toString())
        try {
            const erc20 = new Erc20Service(this.utils.wallet, payload.tokenAddress)

            await erc20.approve(amt, this.utils.getContractAddress().txnManager as Address)

            const _txnContract = this.contract(this.utils.wallet);

            const tx = await _txnContract.pay(payload.tokenAddress, "100000", payload.txName, payload.info);
            // const tx = await _txnContract.pay(payload.tokenAddress, payload.amount, payload.txName, payload.info);

            console.log("TxnManager Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("TxnManager Transaction mined:", receipt.transactionHash);
        } catch (error) {
            console.error("TxnManager Pay err: " + this.utils.wallet.address, error)
        }
    }

}