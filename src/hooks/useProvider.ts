import { ethers } from 'ethers'


export const useProvider = () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  return provider
}
