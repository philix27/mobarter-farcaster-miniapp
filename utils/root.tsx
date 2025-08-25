import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base, celo, celoAlfajores } from 'wagmi/chains'


import { AppStores } from '@/lib/zustand'
import { Spinner } from './Spinner'
import { useDidMount } from '@/lib/hooks/useDidMount'

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
  // } catch (e) {
  //   // logger.error('Initialization err' + e)
  //   return undefined
  // }
}

const config = createConfig({
  // connectors,
  chains: [celo, celoAlfajores, base],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [base.id]: http(),
  },
})



const queryClient = new QueryClient()
export function Root(props: PropsWithChildren) {
  const store = AppStores.useUser()
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount()
  if (!didMount) return <Spinner />

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apollo(store.token)!}>
          <Others>{props.children}</Others>
        </ApolloProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function Others(props: PropsWithChildren) {
  return (
    <>
     {props.children}
      <Toaster richColors position="bottom-center" expand={false} closeButton duration={2000} />
    </>
  )
}
