import TokenBalanceDisplay from "../pay/TokenBalance";
import { payTokens } from "../pay/tokens";

export function TokensSection() {

    return (
        <div className='w-full bg-card  flex flex-col space-y-1 h-[300px] overflow-y-scroll '>
            {payTokens.concat(payTokens).map((val, i) => (
                <div key={i} className='rounded-md p-2 flex w-full items-center justify-between  border-b-background border-b'>
                    <div className='flex items-center mr-3 '>
                        <img src={val.token.logo} alt={val.token.symbol} className='md:size-[35px] size-[20px] inline mx-2' />
                        <p><span className='text-[13px] font-semibold'> {val.token.symbol} </span> <span className='text-[10px] text-muted'>{val.chain.name.toUpperCase()}</span> </p>
                    </div>
                    <TokenBalanceDisplay tokenAddress={val.token.address as `0x${string}`} chainId={val.chain.chainId} />
                </div>
            ))}
        </div>
    )
}
