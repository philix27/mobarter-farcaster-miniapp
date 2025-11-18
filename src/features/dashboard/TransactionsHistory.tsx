

export function TransactionsHistorySection() {
    const history: {
        title: string;
        amount: string
        tokenSymbol?: string
    }[] = [
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
            { title: "Airtime", amount: "5000" },
        ]
    return (
        <div className='w-full flex bg-card p-2 flex-col space-y-1 rounded-md'>
            <div className='bg-background px-2 py-1 rounded-sm'>
                <h4 className='text-muted font-semibold text-[14px]'>Transactions History</h4>
            </div>
            <div className='w-full flex flex-col space-y-1 h-[300px] overflow-y-scroll scroll-hide'>
                {history.map((val, i) => (
                    <div key={i} className='p-2 flex w-full items-center justify-between border-b-background border-b'>
                        <div className='flex items-center mr-3 '>
                            <p className="text-[12px] mr-4">{val.title}</p>
                            <p><span className='text-[13px] font-semibold'> {val.tokenSymbol} </span> <span className='text-[10px] text-muted'>{val.amount}</span> </p>
                        </div>
                        {/* <TokenBalanceDisplay tokenAddress={val.token.address as `0x${string}`} chainId={val.chain.chainId} /> */}
                    </div>
                ))}
            </div>
        </div>
    )
}
