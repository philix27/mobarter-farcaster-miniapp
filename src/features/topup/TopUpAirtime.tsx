import { useState } from 'react'
import { toast } from 'sonner'
import { mapCountryToData, COLLECTOR, TokenId } from '@/src/lib/const'
import { AppStores } from '@/src/lib/zustand'
import { usePrice, useSendToken } from '@/src/hooks'
import { Card, Label } from '@/components/comps'
import { Button } from '@/components/Button'
import { AppSelect } from '@/components/Select'
import { Input } from '@/components/Input'
import { triggerEvent } from '@/src/providers/PostHogProvider'



enum Operator {
  Mtn, Airtel, Etisalat, Glo,
}
export function AirtimeSection() {
  const { sendErc20 } = useSendToken()
  const [amtValue, setAmountVal] = useState<number>()
  const [selectedOperator, setOperator] = useState<Operator>()
  const store = AppStores.useSettings()

  const { amountToPay, handleOnChange } = usePrice()


  const handleSend = async () => {
    triggerEvent('top_up_airtime_initiated', { country: store.countryIso, operator: selectedOperator, amount: amtValue });
    const leastAmount = 50

    // if (phoneNo.length < 9) {
    //   toast.error('Enter a valid phone number')
    //   return
    // }

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


  return (
    <div className="w-full items-center justify-center flex flex-col gap-y-4 px-1 space-y-5"
      style={{
        rowGap: 12,
      }}>

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
      <Button className="mt-10 w-[70%]" onClick={handleSend}>
        Send
      </Button>
    </div>
  )
}
