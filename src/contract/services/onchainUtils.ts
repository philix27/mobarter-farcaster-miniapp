import { ethers, } from "ethers";
import { base, celo } from "viem/chains";
import { baseContracts, celoContracts } from "../const";

export enum SupportedChains { celo, base }

export class OnchainUtilsService {

    wallet: ethers.Wallet
    constructor(private privateKey: string, private chain: SupportedChains) {
        this.wallet = this.getWallet()
    }


    private getProvider() {
        switch (this.chain) {
            case SupportedChains.celo: {
                return new ethers.JsonRpcProvider(celo.rpcUrls.default.http[0]);
            }
            case SupportedChains.base: {
                return new ethers.JsonRpcProvider(base.rpcUrls.default.http[0]);
            }
            default:
                return new ethers.JsonRpcProvider(celo.rpcUrls.default.http[0]);
        }
    }

    private getWallet() {
        const provider = this.getProvider();
        return new ethers.Wallet(this.privateKey, provider);
    }

    public getContractAddress() {
        switch (this.chain) {
            case SupportedChains.celo: {
                return celoContracts;
            }
            case SupportedChains.base: {
                return baseContracts
            }
            default:
                return celoContracts;
        }
    }

}