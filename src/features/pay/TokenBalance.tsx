import { useAccount, useBalance } from 'wagmi';

function TokenBalanceDisplay(props: { tokenAddress: `0x${string}`; chainId?: number }) {
    const { address, isConnected } = useAccount();
    // getBalance
    // Replace with the actual ERC-20 token contract address
    const tokenAddress = props.tokenAddress; // Example: DAI token

    const { data: balance, isLoading, isError } = useBalance({
        address: address,
        token: tokenAddress,
        chainId: props.chainId,
    });

    if (!isConnected) {
        return <div>Connect your wallet to see token balance.</div>;
    }

    if (isLoading) {
        return <div className='text-[8px]'>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching balance.</div>;
    }

    return (
        <div>
            {balance ? (
                // The 'balance.value' is a BigNumber, you'll likely want to format it
                <span className='text-[11px] text-muted font-normal'>
                   {balance.formatted} {balance.symbol}
                </span>
            ) : (
                <p>No balance found or token not held.</p>
            )}
        </div>
    );
}

export default TokenBalanceDisplay;