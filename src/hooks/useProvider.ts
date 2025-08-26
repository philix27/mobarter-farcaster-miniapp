import { ethers } from 'ethers'

// import { AppStores } from '../lib/zustand'

export const useProvider = () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  return provider
}
