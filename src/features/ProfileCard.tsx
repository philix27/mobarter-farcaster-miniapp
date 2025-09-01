import { Button } from "@/components/Button";
import { useCallback, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { shortenAddress } from "../lib/config";
import { celo } from "viem/chains";
import { AppStores } from "../lib/zustand";
import { useViewProfile } from "@coinbase/onchainkit/minikit";
import { secrets } from "../lib";


export function ProfileCard() {
    // const { setFrameReady, isFrameReady, } = useMiniKit();
    const { address, isConnected, } = useAccount()
    const { connect, connectors } = useConnect()
    const store = AppStores.useSettings();

    const profile = useViewProfile()

    const handleConnect = useCallback(() => {

        if (secrets.NODE_ENV === 'development') {
            const connector = connectors.find((c) => c.id === "injected") || connectors[0];
            connect({ connector, chainId: celo.id });
            return;
        }
        const connector = connectors.find((c) => c.id === "miniAppConnector") || connectors[0];
        connect({ connector, chainId: celo.id });
    }, [connect, connectors]);

    useEffect(() => {
        if (!isConnected) {
            handleConnect()
        }
    }, [handleConnect, isConnected]);


    if (!isConnected) {
        return <div className="w-full border-b-1 bg-background border-muted flex flex-col items-center justify-center p-4 "
        >

            <Button onClick={handleConnect} className="w-[60%]">Connect</Button>
        </div>
    }
    return (
        <div className="w-full border-b-1 bg-background border-muted flex flex-col justify-center p-4 "
        >
            {address && <p className="text-[12px]"> {shortenAddress(address as string)}</p>}
            <p className="text-[12px]">Country {store.countryIso}</p>
            <p className="text-[12px]" onClick={() => {
                profile()
            }}>Profile</p>
        </div>
    )
}
