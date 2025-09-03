import { ethers } from 'ethers'
import { useMemo } from 'react';


export const useProvider = () => {
  // Memoized provider
  const provider = useMemo(
    () => new ethers.JsonRpcProvider("https://forno.celo.org"),
    []
  );

  // const provider = new ethers.BrowserProvider(window.ethereum)
  return provider
}
