import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
// import { WagmiProvider, createConfig, http } from 'wagmi'
// import { base, celo, celoAlfajores } from 'wagmi/chains'
import { base } from "wagmi/chains";
import { Spinner } from '../components/Spinner'
import { useDidMount } from '../hooks/useDidMount'
import { AppStores } from '../lib/zustand'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'


const apollo = (token: string) => {
  // try {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_SERVER,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: new InMemoryCache(),
  })
  return client

}



// const config = createConfig({
//   // connectors,
//   chains: [celo, celoAlfajores, base],
//   transports: {
//     [celo.id]: http(),
//     [celoAlfajores.id]: http(),
//     [base.id]: http(),
//   },
// })


export function Root(props: PropsWithChildren) {
  const store = AppStores.useUser()

  const didMount = useDidMount()
  if (!didMount) return <Spinner />

  return (
    // <WagmiProvider config={config}>
    <ApolloProvider client={apollo(store.token)!}>
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: "auto",
            theme: "mini-app-theme",
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
            logo: process.env.NEXT_PUBLIC_ICON_URL,
          },
        }}
      >
        {props.children}
      </MiniKitProvider>
      <Toaster richColors position="bottom-center" expand={false} closeButton duration={2000} />
    </ApolloProvider>
    // </WagmiProvider>
  )
}

