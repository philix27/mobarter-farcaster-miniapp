import sdk, { Context } from '@farcaster/miniapp-sdk';
import { useQuery } from "@tanstack/react-query";

export const useFarcasterProfile = () => {
    const query = useQuery<Context.MiniAppContext>({
        queryKey: ["facaster-profile"],
        queryFn: async () => {
            const result = await sdk.context
            return result
        },
    })

    return query
}