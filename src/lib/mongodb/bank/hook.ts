import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IBankAccountParams, IBankAccountResponse } from './service'
import { useFarcasterProfile } from '@/src/features/profile/hook'

const URL = "/api/bank-account"
export function useBankAccountCreate() {
    const profile = useFarcasterProfile()
    const user_id = profile.data?.user.fid
    const mutate = useMutation<IBankAccountResponse["create"], any, IBankAccountParams["create"]>({
        mutationKey: ["bank-create"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input, user_id })
            return result.data
        },
    })

    return mutate
}

export function useBankAccountDelete() {
    const profile = useFarcasterProfile()
    const user_id = profile.data?.user.fid
    const mutate = useMutation<IBankAccountResponse["delete"], any, IBankAccountParams["delete"]>({
        mutationKey: ["bank-delete"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input, user_id })
            return result.data
        },
    })

    return mutate
}
export function useBankAccountGetAll() {
    const profile = useFarcasterProfile()
    const user_id = profile.data?.user.fid
    const mutate = useMutation<IBankAccountResponse["getAll"], any, IBankAccountParams["getAll"]>({
        mutationKey: ["bank-getAll"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input, user_id })
            return result.data
        },
    })

    return mutate
}


export function useGetBankAccounts(data: IBankAccountParams["getOne"]) {
    const profile = useFarcasterProfile()
    const user_id = profile.data?.user.fid
    const query = useQuery<IBankAccountResponse["getOne"], IBankAccountParams["getOne"]>({
        queryKey: ["bank-getOne", data.user_id],
        queryFn: async () => {
            console.log("Get AccountInfo:")
            const result = await axios.get(URL, {
                params: {
                    "user_id": user_id
                },
            })
            return result.data
        },
    })

    return query
}


