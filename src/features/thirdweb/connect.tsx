import { ConnectButton } from "thirdweb/react";
import { celo, } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "./client";


export default function ThirdWebConnectBtn() {
    return (
        <ConnectButton
            client={client}
            theme="light"
            accountAbstraction={{
                chain: celo,
                sponsorGas: true,
            }}
            connectButton={{
                label: "Login",
            }}
            connectModal={{
                title: "Sign in to Mobarter",
                titleIcon: "https://example.com/logo.png",
                size: "compact",
            }}
            wallets={[
                inAppWallet({
                    "auth": {
                        "options": ["google"],
                        "mode": "popup",
                        "defaultSmsCountryCode": "NG"
                    }
                })
            ]}
        />
    )
}

