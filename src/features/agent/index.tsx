import { useGetOrdersForAgent } from "@/src/lib/mongodb/orders/hook";
import { Table, Td, Th, Tr } from "./table";
import { toast } from "sonner";
import { payTokens } from "../pay/tokens";


export const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text).then(() => {
        toast.success('Copied')
    })
}


export function AgentsSection() {

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[1240px] w-full flex flex-col items-center justify-center pt-4">
                {/* <Tabs tabs={dashboardItems} /> */}
                <DisplayOrders />
            </div>
        </div>
    )
}

function getToken(addr: string) {
    const token = payTokens.filter((t) => t.token.address.toUpperCase() === addr.toUpperCase())[0];

    return token.token
}
function DisplayOrders() {
    const { isPending, data } = useGetOrdersForAgent()

    if (isPending) {
        return <div>Loading</div>
    }
    if (!data) {
        return <div>No data found</div>
    }
    return (<Table>
        <thead className="">
            <Tr >
                <Th>Account Name</Th>
                <Th>Account No</Th>
                <Th>Bank Name</Th>
                <Th>Amount Fiat</Th>
                <Th>Status</Th>
                {/* <Th>Created At</Th> */}
                <Th>Crypto</Th>
                <Th>Created At</Th>
            </Tr>
        </thead>
        <tbody>
            {data && data.length > 0 ? (
                data.map((user, i) => {
                    return (
                        <Tr key={i} isOdd={i % 2 == 0}>
                            <Td>{user.account_name || "—"}</Td>
                            <Td
                                onClick={async () => {
                                    await copyText(user.account_number);
                                }}>{user.account_number}</Td>
                            <Td>{user.bank_name}</Td>
                            <Td>{user.fiat_currency} {user.amount_in_fiat || "—"}</Td>
                            <Td>{user.status || "—"}</Td>
                            <Td>{getToken(user.token_address).symbol} {user.amount_in_crypto}</Td>
                        </Tr>
                    )
                })
            ) : (
                <Tr >
                    <td className="px-4 py-2 border text-center" colSpan={4}>
                        No users found
                    </td>
                    <></>
                </Tr >
            )}
        </tbody>
    </Table>
    );

}