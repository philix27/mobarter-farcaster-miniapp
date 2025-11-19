import { TabsComp } from "@/components/tab";
import TokenBalanceDisplay from "../pay/TokenBalance";
import { payTokens } from "../pay/tokens";

export function TokensSection() {

    return (
        <div className='w-full bg-card  flex justify-center  '>
            <TabsComp
                defaultValue="celo"
                list={[
                    {
                        heading: "Celo",
                        value: "celo",
                        content: < _TokensList />
                    },
                    {
                        heading: "Base",
                        value: "base",
                        content: < _TokensList />
                    },
                    {
                        heading: "Ethereum",
                        value: "ethereum",
                        content: <div>Ethereum Tokens</div>
                    },
                ]}
            />

        </div>
    )
}


export function _TokensList() {
    return (
        <div className="w-full h-[400px] overflow-y-scroll no-scrollbar">
            {payTokens.map((val, i) => (
                <div key={i} className='rounded-md p-2 flex w-full items-center justify-between  border-b-background border-b'>
                    <div className='flex items-center mr-3 '>
                        <img src={val.token.logo} alt={val.token.symbol} className='md:size-[30px] size-[20px] inline mx-2' />
                        <p className="ml-4">
                            <span className='text-[13px] font-semibold'> {val.token.symbol} </span>
                            <span className='text-[10px] text-muted'>{val.chain.name.toUpperCase()}</span>
                        </p>
                    </div>
                    <TokenBalanceDisplay tokenAddress={val.token.address as `0x${string}`} chainId={val.chain.chainId} />
                </div>
            ))}
        </div>
    )
}   