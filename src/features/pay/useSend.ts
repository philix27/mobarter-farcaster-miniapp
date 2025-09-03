import { ethers, Interface, } from 'ethers'
import { useAccount, useWriteContract, } from 'wagmi'
import * as divvi from '@divvi/referral-sdk'
import { appAddresses } from '../../lib/const'
import { logger } from '../../lib/utils'
import { IPayWith } from './tokens'
import { ChainName } from './chains'
import { base, celo } from 'viem/chains'
import { erc20TokenAbi } from './erc20Abi'
import { toast } from 'sonner'


export function useSendToken() {
  const { address, } = useAccount();
  const {
    writeContractAsync,
    data,
    isPending,
    isSuccess,
    error,
    reset
  } = useWriteContract();


  const sendErc20 = async (props: { recipient: string; amount: string; payWith: IPayWith }) => {
    const chain = props.payWith.chain
    const activeChain = chain.name === ChainName.Base ? base : celo;
    const token = props.payWith.token

    try {
      const transferInterface = new Interface(erc20TokenAbi);
      const transferData = transferInterface.encodeFunctionData("transfer", [
        props.recipient,
        ethers.parseUnits(props.amount, token.decimal),
      ]);

      // Generate Divvi referral tag
      const dataSuffix = divvi.getReferralTag({
        user: address!, // The user address making the transaction
        consumer: appAddresses.divvi as `0x${string}`, // Your Divvi consumer address
      })

      // Append Divvi suffix to transaction data
      let dataWithSuffix = transferData;

      if (dataSuffix && dataSuffix.startsWith('0x')) {
        // Remove '0x' prefix from suffix before concatenating
        dataWithSuffix = transferData + dataSuffix.slice(2);
      } else if (dataSuffix) {
        dataWithSuffix = transferData + dataSuffix;
      }

      // Execute the transaction with encoded data
      const txn = await writeContractAsync({
        address: token.address as `0x${string}`,
        abi: erc20TokenAbi,
        functionName: 'transfer',
        args: [props.recipient as `0x${string}`, ethers.parseUnits(props.amount, token.decimal),],
        chain: activeChain, // Pass the current chain object
        account: address, // Pass the current user's address
        dataSuffix: dataWithSuffix as `0x${string}`
      });


      logger.info(`Transaction successful: ${txn}`)

      await divvi.submitReferral({
        txHash: txn,
        chainId: activeChain.id
      });
      logger.info("Referral submitted successfully");
      return {
        data, isPending, isSuccess, error, reset, txHash: txn
      }
    } catch (e) {
      logger.error("Transfer Error", e)
      toast.error(getSafeErrorMessage(e));
      return undefined
    }

  }

  return { sendErc20, }
}


const getSafeErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('insufficient funds') || message.includes('insufficient balance')) {
      return 'Insufficient funds in wallet';
    }
    if (message.includes('user rejected') || message.includes('user denied')) {
      return 'Transaction cancelled by user';
    }
    if (message.includes('network') || message.includes('connection')) {
      return 'Network error. Please check your connection';
    }
    if (message.includes('nonce')) {
      return 'Transaction conflict. Please try again';
    }
  }
  return 'Transaction failed. Please try again';
};