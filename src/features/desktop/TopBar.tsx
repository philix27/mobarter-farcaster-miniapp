import { AppSelect } from "@/components/Select";

export function TopBar() {
    return (
        <div className='w-full h-[45px] px-[50px] flex items-center justify-between py-2 border-b-muted border-b-1'>
            <div>
                <p className="font-bold text-[18px]">Mobarter</p>
            </div>
            <div>
                <AppSelect 
                className="w-full"
                value="Go to"
                onChange={() => { return }} data={[
                    { "label": "Wallet", "value": "wallet" },
                    { "label": "Bill Payment", "value": "Bill Payment" },
                    { "label": "Tokens", "value": "Tokens" },
                    { "label": "Savings", "value": "Savings" },
                ]} />
            </div>
            <div>
                <p>Username</p>
            </div>
        </div>
    )
}
