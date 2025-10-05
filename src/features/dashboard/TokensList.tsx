import TokenBalanceDisplay from "../pay/TokenBalance";
import { payTokens } from "../pay/tokens";

export function TokensSection() {

    return (
        <div className='w-full flex flex-col space-y-2'>
            {payTokens.map((val, i) => (
                <div key={i} className='bg-card rounded-md p-2 flex w-full items-center justify-between'>
                    <div className='flex items-center mr-2'>
                        <img src={val.token.logo} alt={val.token.symbol} className='md:size-[40px] size-[20px] inline mx-2' />
                        <p><span className='text-[13px] font-semibold'> {val.token.symbol} </span> <span className='text-[10px] text-muted'>{val.chain.name.toUpperCase()}</span> </p>
                    </div>
                    <TokenBalanceDisplay tokenAddress={val.token.address as `0x${string}`} chainId={val.chain.chainId} />

                </div>
            ))}
        </div>
    )
}
