import { baseChain, celoChain } from "./chains";

export type IPayWith = {
    chain: {
        name: string;
        logo: string
        chainId: string
    },
    token: {
        address: string;
        symbol: string;
        logo: string
    }
}


export const payTokens: IPayWith[] = [
    {
        chain: celoChain,
        token: {
            symbol: "cUSD",
            address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
            logo: "https://cryptologos.cc/logos/celo-usd-cusd-logo.png"
        }

    },
    {
        chain: celoChain,
        token: {
            symbol:  "USDC",
            address: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
            logo: "https://cryptologos.cc/logos/celo-usd-cusd-logo.png"
        }

    },
    {
        chain: celoChain,
        token: {
            symbol:  "USDT",
            address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
            logo: "https://cryptologos.cc/logos/celo-usd-cusd-logo.png"
        }

    },
    {
        chain: baseChain,
        token: {
            symbol:  "USDC",
            address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
            logo: "https://cryptologos.cc/logos/celo-usd-cusd-logo.png"
        }

    },
    {
        chain: baseChain,
        token: {
            symbol:  "USDT",
            address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
            logo: "https://cryptologos.cc/logos/celo-usd-cusd-logo.png"
        }

    },
]