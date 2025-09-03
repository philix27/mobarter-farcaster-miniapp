import { ethers } from 'ethers'
import { useMemo } from 'react';
import { base, celo } from 'viem/chains';


export const useProvider = () => {
  // Memoized provider
  const providerCelo = useMemo(
    () => new ethers.JsonRpcProvider(celo.rpcUrls.default.http[0]),
    []
  );
  const providerBase = useMemo(
    () => new ethers.JsonRpcProvider(base.rpcUrls.default.http[0]),
    []
  );

  // const provider = new ethers.BrowserProvider(window.ethereum)
  return { celo: providerCelo, base: providerBase }
}
