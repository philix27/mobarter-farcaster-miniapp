import { ethers } from 'ethers'


export const useProvider = () => {
  // Memoized provider
  // const provider = useMemo(
  //   () => new ethers.JsonRpcProvider("https://forno.celo.org"),
  //   []
  // );

  const provider = new ethers.BrowserProvider(window.ethereum)
  return provider
}
