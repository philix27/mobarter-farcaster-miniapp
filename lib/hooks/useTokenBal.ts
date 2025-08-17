
'use client'
import { useAccount, useBalance } from 'wagmi'
import { getBal } from '../utils/getBalance'
import { ChainId } from '../const/chains'
import { getTokenAddress, TokenId } from '../const/tokens'

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
