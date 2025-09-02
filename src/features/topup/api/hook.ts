import { useMutation } from '@tanstack/react-query'
import { Utilities_TopUpInput, Utilities_TopUpResponse } from './utilities.dto'
import axios from 'axios'

export function usePurchaseTopUp() {
    const mutate = useMutation<Utilities_TopUpResponse, any, Utilities_TopUpInput>({
        "mutationKey": ["purchase-data"],
        mutationFn: async (input) => {
            const result = await axios.post("/api/topup", { ...input })
            return result.data as unknown as Utilities_TopUpResponse
        },
    })

    return mutate
}
