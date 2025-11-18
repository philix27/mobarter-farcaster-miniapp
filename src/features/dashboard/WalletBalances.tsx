export function WalletBalance() {
    const cardSections: { title: string; subtitle?: string; amount: string }[] = [
        { title: "Total Balance", amount: "100 USD" },
        { title: "Locked Savings", amount: "100 USD" },
        // { title: "Total Balance", amount: "100 USD" },
    ]
    return (
        <div className='w-full flex md:flex-row flex-col justify-around md:space-x-4 space-y-2 md:space-y-0 mb-5 md:mb-10'>
            {cardSections.map((card, i) => (
                <div key={i} className='bg-card rounded-lg p-2 w-full border-muted border'>
                    <div className='flex w-full items-center justify-between md:mb-4 mb-2'>
                        <p className='text-[12px] font-bold'>{card.title}</p>
                        <p className='text-[18px] font-thin'>{card.amount}</p>
                    </div>

                    <p className='text-[12px] font-thin text-muted'>Balance</p>
                </div>
            ))}
        </div>
    )
}
