import { ethers, } from 'ethers'
// import { toast } from 'sonner'
import { useSwitchChain } from 'wagmi'
// import * as divvi from '@divvi/referral-sdk'
// import { appAddresses } from '../lib/const'
// import { logger } from '../lib/utils'
import { IPayWith } from '../features/pay/tokens'


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


// const ERC20_ABI = ['function transfer(address recipient, uint256 amount) public returns (bool)']


export function useSendToken() {
  // const { address, } = useAccount();
  const provider = new ethers.BrowserProvider(window.ethereum)

  const {
    switchChain,
  } = useSwitchChain();

  const sendErc20 = async (props: { recipient: string; amount: string; payWith: IPayWith }) => {
    // const signer = await provider.getSigner()


    // if (!signer) {
    //   toast.error('Please connect your wallet')
    //   throw new Error('Signer needed')
    // }

    const chain = props.payWith.chain
    switchChain({ chainId: chain.chainId });


    // const token = props.payWith.token
    // const contract = new ethers.Contract(
    //   token.address,
    //   ERC20_ABI,
    //   signer
    // )
    console.log( provider)

    // // ! Start Divvi
    // const transferData = contract.interface.encodeFunctionData("transfer", [
    //   props.recipient,
    //   ethers.parseUnits(props.amount, token.decimal),
    // ]);

    // // Generate Divvi referral tag
    // const dataSuffix = divvi.getReferralTag({
    //   user: address!, // The user address making the transaction
    //   consumer: appAddresses.divvi as `0x${string}`, // Your Divvi consumer address
    // })

    // // Append Divvi suffix to transaction data
    // let dataWithSuffix = transferData;
    // //  const txData = transferData + dataSuffix;
    // // const txData = transferData + ethers.hexlify(ethers.toUtf8Bytes(dataSuffix)).slice(2);

    // if (dataSuffix && dataSuffix.startsWith('0x')) {
    //   // Remove '0x' prefix from suffix before concatenating
    //   dataWithSuffix = transferData + dataSuffix.slice(2);
    // } else if (dataSuffix) {
    //   dataWithSuffix = transferData + dataSuffix;
    // }

    // // // Send transaction
    // const txn = await signer.sendTransaction({
    //   to: token.address,
    //   data: dataWithSuffix,
    // });

    // logger.info("Tx hash:", txn.hash);

    // // ! End Divvi

    // // const tx = await contract.transfer(props.recipient, ethers.parseUnits(props.amount, token.decimal)) // cUSD has 18 decimals
    // // await tx.wait() // Wait for transaction to be mined
    // logger.info(`Transaction successful: ${txn.hash}`)

    // try {
    //   await divvi.submitReferral({
    //     txHash: txn.hash as `0x${string}`,
    //     chainId: chain.chainId
    //   });
    //   logger.info("Referral submitted successfully");
    // } catch (referralError) {
    //   logger.error("Referral submission error:", referralError);
    // }

    // return JSON.stringify(txn.hash)
    return JSON.stringify(props)
  }



  return { sendErc20, }
}

