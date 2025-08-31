export enum ChainName {
    Celo = "CELO",
    Base = "BASE",
    Optimism = "OPTIMISM"
}
export type IChain = {
    name: ChainName;
    logo: string
    chainId: number
}
export const celoChain: IChain = {
    name: ChainName.Celo,
    logo: "https://cryptologos.cc/logos/celo-cele-logo.png",
    chainId: 42220

}
export const baseChain: IChain = {
    name: ChainName.Base,
    logo: "https://cryptologos.cc/logos/base-base-logo.png",
    chainId: 8453

}
export const optimismChain: IChain = {
    name: ChainName.Optimism,
    logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    chainId: 10

}
