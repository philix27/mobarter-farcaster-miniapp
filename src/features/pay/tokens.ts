import { baseChain, celoChain, IChain } from "./chains";

export type IPayWith = {
    chain: IChain,
    token: {
        address: string;
        symbol: string;
        logo: string
        decimal: number
    }
}


export const payTokens: IPayWith[] = [
    {
        chain: celoChain,
        token: {
            symbol: "cUSD",
            address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
            logo: '/tokens/cUSD.svg',
            decimal: 18
        }
    },
    {
        chain: celoChain,
        token: {
            symbol: "USDC",
            address: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
            logo: '/tokens/USDC.svg',
            decimal: 18
        }
    },
    {
        chain: celoChain,
        token: {
            symbol: "USDT",
            address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
            logo: '/tokens/USDT.svg',
            decimal: 18
        }
    },
    {
        chain: baseChain,
        token: {
            symbol: "USDC",
            address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
            logo: '/tokens/USDC.svg',
            decimal: 18
        }
    },
    {
        chain: baseChain,
        token: {
            symbol: "USDT",
            address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
            logo: '/tokens/USDT.svg',
            decimal: 18
        }

    },
]