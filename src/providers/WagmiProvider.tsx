import { createConfig, http, injected, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'
import { base, celo, optimism } from "viem/chains";

// Create a custom config with error handling
export const config = createConfig({
  chains: [celo, base, optimism],
  transports: {
    [celo.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [miniAppConnector(), injected()],
});

const queryClient = new QueryClient();

export default function WagmiiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
