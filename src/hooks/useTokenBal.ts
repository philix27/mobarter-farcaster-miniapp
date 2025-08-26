
'use client'
import { useAccount, useBalance } from 'wagmi'
import { ChainId } from '../lib/const/chains'
import { getTokenAddress, TokenId } from '../lib/const/tokens'
import { getBal } from '../lib/utils/getBalance'

export const useTokenBalance = (id: TokenId) => {
  const evmAddress = ""

  const addr = evmAddress
  const { data, isLoading } = useBalance({
    address: addr as `0x${string}`,
    chainId: ChainId.Celo,
    token: getTokenAddress(id, ChainId.Celo) as `0x${string}`,
  })

  return isLoading ? '...' : `${getBal(data)} ${id}`
}

export const useTokenBalanceWeb = (id: TokenId) => {
  const { address } = useAccount()

  const addr = address
  const { data, isLoading } = useBalance({
    address: addr as `0x${string}`,
    chainId: ChainId.Celo,
    token: getTokenAddress(id, ChainId.Celo) as `0x${string}`,
  })

  return isLoading ? '...' : `${getBal(data)} ${id}`
}
