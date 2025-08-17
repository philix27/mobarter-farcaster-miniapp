'use client'
// import { useMutation } from '@apollo/client'
// import {
//   MutationResponse,
//   MutationUtility_PurchaseAirtimeArgs,
//   Operator,
//   Utility_PurchaseAirtimeDocument,
// } from '@repo/api'
import { useState } from 'react'
import { FaCopy } from 'react-icons/fa6'
import { toast } from 'sonner'
import { countryCode, mapCountryToData, mapCountryToIso } from '@/lib/const/countries'
import { Card, Label, AppSelect, Input, Button } from '../components'
import { BalCard } from './BalCard'
import { AppStores } from '@/lib/zustand'
import { COLLECTOR } from '@/lib/const/consts'
import { usePrice, useSendToken } from '@/lib/hooks'
import { TokenId } from '@/lib/const'

enum Operator {
  Mtn, Airtel, Etisalat, Glo,
}
export default function Airtime() {
  return <Tg />
}

function Tg() {
  const { sendErc20 } = useSendToken()
  return <AirtimeComps sendErc20={sendErc20} />
}

function AirtimeComps(props: {
  sendErc20: (props: { recipient: string; amount: string; token: TokenId }) => Promise<string>
}) {
  const [amtValue, setAmountVal] = useState<number>()
  const [phoneNo, setPhoneNo] = useState<string>('')
  const [selectedOperator, setOperator] = useState<Operator>()
  const store = AppStores.useSettings()
  const { sendErc20 } = props
  const { amountToPay, handleOnChange } = usePrice()

  // const [mutate] = useMutation<
  //   MutationResponse<'utility_purchaseAirtime'>,
  //   MutationUtility_PurchaseAirtimeArgs
  // >(Utility_PurchaseAirtimeDocument)

  const handleSend = async () => {
    const leastAmount = 50

    if (phoneNo.length < 9) {
      toast.error('Enter a valid phone number')
      return
    }

    if (selectedOperator === undefined) {
      toast.error('Select an operator')
      return
    }
    if (amtValue == undefined || amtValue < leastAmount) {
      toast.error('Minimum of NGN1,000')
      return
    }
    await sendErc20({
      recipient: COLLECTOR,
      amount: amountToPay!.toString(),
      token: TokenId.cUSD,
    })
      .then(() => {
        // void mutate({
        //   variables: {
        //     input: {
        //       amount: amtValue,
        //       countryCode: mapCountryToIso[store.countryIso],
        //       operator: selectedOperator!,
        //       transaction_hash: txHash || `${Date.now()}`,
        //       phoneNo: `${countryCode(store.countryIso).slice(1)}${phoneNo}`,
        //     },
        //   },
        //   onCompleted() {
        //     toast.success('Sent successfully')
        //     setPhoneNo('')
        //     setAmountVal(0)
        //   },
        // })
      })
      .catch((err) => {
        toast.error('Error: ', err.message)
      })
  }
  async function pasteTextFromClipboard(): Promise<string> {
    try {
      return await navigator.clipboard.readText();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to read from clipboard');
      return '';
    }
  }

  return (
    <div className="w-full items-center justify-center flex flex-col gap-y-4 px-1">
      <BalCard />
      <Input
        label={`${mapCountryToIso[store.countryIso]} Phone number`}
        placeholder={`8101234567`}
        preText={countryCode(store.countryIso)}
        value={phoneNo}
        type="number"
        onChange={(e) => {
          const num = e.target.value
          if (num.length > 11) {
            toast.error('11 characters max')
            return
          }
          setPhoneNo(num.toString())
        }}
        trailingIcon={
          <FaCopy
            className="text-muted"
            onClick={async () => {
              const text = await pasteTextFromClipboard()
              setPhoneNo(text)
            }}
          />
        }
      />
      <AppSelect
        label="Network*"
        onChange={(data) => {
          setOperator(data as unknown as Operator)
        }}
        data={[
          { label: 'MTN', value: Operator.Mtn.toString() },
          { label: 'Airtel', value: Operator.Airtel.toString() },
          { label: 'Glo', value: Operator.Glo.toString() },
          { label: 'Etisalat', value: Operator.Etisalat.toString() },
        ]}
      />
      <Input
        label={`Amount*`}
        preText={mapCountryToData[store.countryIso].currencySymbol}
        placeholder="Amount to send"
        type="number"
        step=".01"
        value={amtValue}
        onChange={(e) => {
          const num = parseFloat(e.target.value)
          if (isNaN(num)) {
            return
          }
          // if (parseInt(e.target.value) < 0) {
          //   return
          // }
          setAmountVal(num)
          handleOnChange(num)
        }}
      />
      <div className="w-full mt-3">
        <Label>You Pay:</Label>
        <Card>{amountToPay}</Card>
      </div>
      <Button className="mt-5 w-[70%]" onClick={handleSend}>
        Send
      </Button>
    </div>
  )
}
