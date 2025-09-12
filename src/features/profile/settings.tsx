import { Button } from "@/components/Button";
import { useCallback, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { shortenAddress } from "../../lib/config";
import { celo } from "viem/chains";
import { AppStores } from "../../lib/zustand";
import { secrets } from "../../lib";
import { AdsRow, } from "@/components/comps";
import { useDarkMode } from "@/src/styles/mediaQueries";

export function SettingsCard() {
    const { address, isConnected, } = useAccount()
    const { connect, connectors } = useConnect()
    const store = AppStores.useSettings();
    const { isDarkMode, setDarkMode } = useDarkMode()

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
            <Button
                btnName='Connect Wallet'
                onClick={handleConnect} className="w-[60%]">Connect</Button>
        </div>
    }
    return (
        <div className="w-full p-2 border-b-1 border-muted  rounded-lg flex flex-col items-start justify-center bg-card">

            <AdsRow text="Country" text2={store.country} />
            <AdsRow
                text="Wallet Address"
                text2={shortenAddress(address as string)}
                text2options={{
                    active: true,
                }}
            />


            <AdsRow
                text="Theme"
                text2={"Toggle"}
                text2options={{
                    active: true,
                    onClick: () => {
                        setDarkMode(!isDarkMode)
                    }
                }}
            />
        </div>
    )
}
