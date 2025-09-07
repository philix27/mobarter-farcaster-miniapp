import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IBankAccountParams, IBankAccountResponse } from './service'

const URL = "/api/bank-account"
export function useBankAccountCreate() {
    const mutate = useMutation<IBankAccountResponse["create"], any, IBankAccountParams["create"]>({
        mutationKey: ["bank-create"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input })
            return result.data
        },
    })

    return mutate
}

export function useBankAccountDelete() {
    const mutate = useMutation<IBankAccountResponse["delete"], any, IBankAccountParams["delete"]>({
        mutationKey: ["bank-delete"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input })
            return result.data
        },
    })

    return mutate
}
export function useBankAccountGetAll() {
    const mutate = useMutation<IBankAccountResponse["delete"], any, IBankAccountParams["delete"]>({
        mutationKey: ["bank-delete"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input })
            return result.data
        },
    })

    return mutate
}


export function useGetBankAccounts(data: IBankAccountParams["getAll"]) {
    const query = useQuery<IBankAccountResponse["getAll"], IBankAccountParams["getAll"]>({
        queryKey: ["accountNo", data.user_id],
        queryFn: async () => {
            console.log("Get AccountInfo:")
            const result = await axios.get(URL, {
                params: {
                    ...data
                },
            })
            return result.data
        },
    })

    return query
}


