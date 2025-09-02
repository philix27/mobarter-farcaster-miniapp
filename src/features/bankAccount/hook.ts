import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface BankGetAccountNameInput {
    account_number: string;
    bank_code: string;
}


export interface BankGetAccountName_Response {
    account_number: string;
    account_name: string;
    first_name: string;
    last_name: string;
    other_name: string;
    Bank_name: string;
    bank_code: string;
    requests: string;
    status: number
}

export function useFetchAccountInfo(data: BankGetAccountNameInput) {
    const query = useQuery<BankGetAccountName_Response, BankGetAccountNameInput>({
        queryKey: ["accountNo", data.account_number, data.bank_code],
        queryFn: async () => {
            const result = await axios.get("/api/account-info", {
                params: {
                    account_number: data.account_number,
                    bank_code: data.bank_code
                }
            })
            console.log("AccountInfo:", result.data)
            return result.data as BankGetAccountName_Response
        },
    })

    return query
}


