import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { base } from "wagmi/chains";
import { useDidMount } from '../hooks/useDidMount'
import { AppStores } from '../lib/zustand'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { Spinner } from '@/components/Spinner';
import { WagmiPosthog } from './providers';


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


export function Root(props: PropsWithChildren) {
  const store = AppStores.useUser()

  const didMount = useDidMount()
  if (!didMount) return <Spinner />

  return (
    <WagmiPosthog>
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
        <Toaster richColors position="top-center" expand={false} closeButton duration={2000} />
      </ApolloProvider>
    </WagmiPosthog>
  )
}

