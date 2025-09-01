import { ethers, } from 'ethers'
import { toast } from 'sonner'
import { IPayWith } from '../features/pay/tokens'
import { useSwitchChain } from 'wagmi'
import { useProvider } from './useProvider'

const ERC20_ABI = ['function transfer(address recipient, uint256 amount) public returns (bool)']


export function useSendToken() {

  const {
    switchChain,
  } = useSwitchChain();
  const provider = useProvider()

  const sendErc20 = async (props: { recipient: string; amount: string; payWith: IPayWith }) => {
    const signer = await provider.getSigner()


    if (!signer) {
      toast.error('Please connect your wallet')
      throw new Error('Signer needed')
    }

    const chain = props.payWith.chain
    switchChain({ chainId: chain.chainId });


    const token = props.payWith.token
    const contract = new ethers.Contract(
      token.address,
      ERC20_ABI,
      signer
    )

    const tx = await contract.transfer(props.recipient, ethers.parseUnits(props.amount, token.decimal)) // cUSD has 18 decimals
    await tx.wait() // Wait for transaction to be mined
    console.log(`Transaction successful: ${tx.hash}`)
    return JSON.stringify(tx.hash)
  }

  return { sendErc20, }
}


export interface ISendTxnError {
  code: string
  action: string
  data: string
  reason: string
  transaction: Transaction
  invocation: any
  revert: Revert
  shortMessage: string
  info: Info
}

interface Transaction {
  to: string
  data: string
  from: string
}

interface Revert {
  signature: string
  name: string
  args: string[]
}

interface Info {
  error: Error
  payload: Payload
}

interface Error {
  code: number
  data: Data
  message: string
}

interface Data {
  code: number
  message: string
  data: string
  cause: any
}

interface Payload {
  method: string
  params: Param[]
  id: number
  jsonrpc: string
}

interface Param {
  from: string
  to: string
  data: string
}
