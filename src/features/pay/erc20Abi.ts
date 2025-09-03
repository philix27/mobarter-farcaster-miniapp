export const erc20TokenAbi = [
    {
        type: "function",
        name: "transfer",
        stateMutability: "nonpayable",
        inputs: [
            { name: "to", type: "address" },
            { name: "value", type: "uint256" }
        ],
        outputs: [
            { name: "", type: "bool" }
        ]
    }
] as const;