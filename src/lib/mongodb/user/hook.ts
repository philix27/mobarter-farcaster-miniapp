import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IUserInfoParams, IUserInfoResponse } from './service'
import { useFarcasterProfile } from '@/src/features/profile/hook'
import { testFid } from '../const'

const URL = "/api/user-info"
export function useUserInfoCreate() {
    const profile = useFarcasterProfile()
    const fid = profile.data?.user.fid
    const mutate = useMutation<IUserInfoResponse["create"], any, IUserInfoParams["create"]>({
        mutationKey: ["user-create"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input, fid: fid || testFid })
            return result.data
        },
    })

    return mutate
}


export function useUserInfoGet() {
    const profile = useFarcasterProfile()
    const fid = profile.data?.user.fid

    const query = useQuery<IUserInfoParams["get"], IUserInfoResponse["get"]>({
        queryKey: ["user-get"],
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


