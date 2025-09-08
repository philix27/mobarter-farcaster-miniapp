import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IUserInfoParams, IUserInfoResponse } from './service'
import { useFarcasterProfile } from '@/src/features/profile/hook'

const URL = "/api/user-info"
export function useUserInfoCreate() {
    const profile = useFarcasterProfile()
    const user_id = profile.data?.user.fid
    const mutate = useMutation<IUserInfoResponse["create"], any, IUserInfoParams["create"]>({
        mutationKey: ["user-create"],
        mutationFn: async (input) => {
            const result = await axios.post(URL, { ...input, user_id })
            return result.data
        },
    })

    return mutate
}




export function useUserInfoGet(data: IUserInfoParams["get"]) {
    const profile = useFarcasterProfile()
    const fid = profile.data?.user.fid

    const query = useQuery<IUserInfoResponse["get"], IUserInfoParams["get"]>({
        queryKey: ["user-get", data.fid],
        queryFn: async () => {
            const result = await axios.get(URL, {
                params: {
                    fid: fid
                },
            })
            return result.data
        },
    })

    return query
}


