import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IOrderParams, IOrderResponse } from './service'
import { useFarcasterProfile } from '@/src/features/profile/hook'
import { testFid } from '../const'

const URL = "/api/orders"
export function useOrdersCreate() {
    const profile = useFarcasterProfile()
    const fid = profile.data?.user.fid
    const mutate = useMutation<IOrderResponse["create"], any, IOrderParams["create"]>({
        mutationKey: ["orders-create"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input, fid: fid || testFid, })
            return result.data
        },
    })

    return mutate
}


export function useOrdersGet() {
    const profile = useFarcasterProfile()
    const fid = profile.data?.user.fid

    const query = useQuery<IOrderParams["getAll"], any, IOrderResponse["getAll"]>({
        queryKey: ["orders-get"],
        queryFn: async () => {
            const result = await axios.get(URL, {
                params: {
                    fid: fid || testFid
                },
            })
            return result.data.data
        },
    })
    return query
}


