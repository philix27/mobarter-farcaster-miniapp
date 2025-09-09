import { mapCountryToData,  } from '@/src/lib'
import React from 'react'
import { PriceDisplay, PayWithToken, getSafeErrorMessage, useSendToken } from '../pay'
import { Input } from '@/components/Input'
import { useOrders } from './_store'
import { useSettings } from '@/src/lib/zustand/settings'
import { Label } from '@/components/comps'
import { usePrice, } from '@/src/hooks'
import { toast } from 'sonner'
import { appAddresses } from '@/src/lib/const'
import { triggerEvent } from '@/src/providers/PostHogProvider'
import { logger } from '@/src/lib/utils'
import { useAccount } from 'wagmi'
// import { useNotification } from '@coinbase/onchainkit/minikit'
import { useBankAccountGetAll } from '@/src/lib/mongodb/bank/hook'
import { Spinner } from '@/components/Spinner'
import { AppSelect } from '@/components/Select'
import { useOrdersCreate } from '@/src/lib/mongodb/orders/hook'

export default function OrderSell() {
  const ordersStore = useOrders()
  const store = useSettings()
  const { sendErc20 } = useSendToken()
  const { amountToPay, } = usePrice({ amountInFiat: ordersStore.amountFiat })
  const { address } = useAccount()
  // const sendNotification = useNotification()
  const sellCrypto = useOrdersCreate()
  const currencySymbol = mapCountryToData[store.countryIso].currencySymbol
 
  const handleSend = async () => {
    const leastAmount = 40

    if (ordersStore.amountFiat == undefined || ordersStore.amountFiat < leastAmount) {
      toast.error(`Minimum of NGN ${leastAmount}`)
      return
    }
    if (ordersStore.bankName == undefined || !ordersStore.accountNo) {
      toast.error(`Please select an account`)
      return
    }

    try {
      ordersStore.update({ isLoading: true })
      const txn = await sendErc20({
        recipient: appAddresses.topUpCollector,
        amount: amountToPay!.toString(),
        payWith: store.payWith
      })
      sellCrypto.mutate({
        type: 'SELL',
        status: 'PENDING',
        fiat_currency: 'NGN',
        amount_in_fiat: ordersStore.amountFiat,
        amount_in_crypto: amountToPay,
        txn_hash: txn.txHash,
        bank_name: ordersStore.bankName,
        account_name: ordersStore.accountName,
        account_number: ordersStore.accountNo,
        bank_code: ordersStore.bankCode,
        token_name: store.payWith.token.symbol,
        token_address: store.payWith.token.address,
        chain_name: store.payWith.chain.name
      },
        {
          onSuccess: async () => {
            logger.info("Txn hash" + txn)
            triggerEvent('create_order_successful', { userId: address, amount: ordersStore.amountFiat });
            toast.success('Order created successfully')
            void ordersStore.update({ amountFiat: 0 })
            // await sendNotification({
            //   title: "Success",
            //   body: `Order created successfully!`,
            // });
          },
          onError: (err) => {
            toast.error("Sorry could not create order");
            logger.error('Order ' + JSON.stringify(err))
          },
          onSettled: () => {
            ordersStore.update({ isLoading: false })
          },

        }
      )

    } catch (err) {
      toast.error(getSafeErrorMessage(err));
      logger.error('Topup ' + JSON.stringify(err))
      triggerEvent('top_up_airtime_failed', { userId: address, amount: ordersStore.amountFiat, error: err });
    } finally {
      ordersStore.update({ isLoading: false })
    }
  }
  return (
    <div className='space-y-5 px-2'>
      <PayWithToken />
      <Input
        label={`Amount*`}
        preText={currencySymbol}
        placeholder="Amount to send"
        type="number"
        step=".01"
        value={ordersStore.amountFiat}
        onChange={(e) => {
          const num = parseFloat(e.target.value)
          if (isNaN(num)) {
            return
          }

          ordersStore.update({ amountFiat: num })
        }}
      />

      <SelectBankAccount />

      <PriceDisplay isLoading={ordersStore.isLoading} handleSend={handleSend} rows={[
        { "title": "You Pay", subtitle: "USD ".concat(amountToPay.toString()) },
        { "title": "You Receive", subtitle: currencySymbol.concat(ordersStore.amountFiat.toString()) },
        { "title": "Bank Account", subtitle: ordersStore.bankName, },
        { "title": "Account No", subtitle: ordersStore.accountNo, },
        { "title": "Account name", subtitle: ordersStore.accountName },
      ]} />
    </div>
  )
}

function SelectBankAccount() {
  const accounts = useBankAccountGetAll()
  const ordersStore = useOrders()
  if (accounts.isPending) {
    return <Spinner size={24} />
  }

  if (!accounts.data || accounts.data?.length === 0) {
    return <div className='flex space-y-4 items-center justify-center flex-col'>
      <Label>Go to settings to add a bank account</Label>
      <div className='mb-5' />
    </div>

  }

  return (
    <div className=''>
      <AppSelect
        label="Select Account*"
        defaultInputValue={ordersStore.accountId}
        onChange={(value) => {
          const acct = accounts.data.filter((t) => t._id === value)[0]
          ordersStore.update({
            accountId: value,
            accountName: acct.account_name,
            accountNo: acct.account_no,
            bankCode: acct.bank_code,
            bankName: acct.bank_name
          })

        }}
        data={accounts.data.map((val, i) => {
          return {
            value: val._id,
            label: (
              <div key={i} className='flex items-center justify-between w-full'>
                <div className='flex items-center mr-2'>
                  <p>
                    <span className='text-[12px] font-semibold'> {val.bank_name} </span>
                    <span className='text-[10px] text-muted'>{val.account_name}</span>
                  </p>
                </div>
                <p className='text-[13px] font-normal text-muted'>{val.account_no} </p>
              </div>
            )
          }
        })}
      />

    </div>
  )
}