import { toast } from 'sonner'
import { mapCountryToData, COLLECTOR, TokenId } from '@/src/lib/const'
import { AppStores } from '@/src/lib/zustand'
import { usePrice, useSendToken } from '@/src/hooks'
import { Input } from '@/components/Input'
import { triggerEvent } from '@/src/providers/PostHogProvider'
import PriceDisplay from './Price'
import { useTopUpForm } from './hook'


export function AirtimeSection() {
  const { sendErc20 } = useSendToken()
  const store = AppStores.useSettings()

  const topUp = useTopUpForm();
  const { amountToPay, } = usePrice({ amountInFiat: topUp.amountFiat })

  const handleSend = async () => {
    triggerEvent('top_up_airtime_initiated', { country: store.countryIso, amount: topUp.amountFiat });
    const leastAmount = 50

    if (topUp.phoneNo || topUp.phoneNo.length < 9) {
      toast.error('Enter a valid phone number')
      return
    }

    if (topUp.amountFiat == undefined || topUp.amountFiat < leastAmount) {
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
    <>
      <div className="w-full items-center justify-center flex flex-col gap-y-4 px-1 space-y-5 mb-4"
        style={{
          rowGap: 12,
        }}>

        {/* <AppSelect
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
      /> */}
        <Input
          label={`Amount*`}
          preText={mapCountryToData[store.countryIso].currencySymbol}
          placeholder="Amount to send"
          type="number"
          step=".01"
          value={topUp.amountFiat}
          onChange={(e) => {
            const num = parseFloat(e.target.value)
            if (isNaN(num)) {
              return
            }

            topUp.update({ amountFiat: num })
          }}
        />


      </div>
      <PriceDisplay
        handleSend={handleSend}
        rows={[
          { title: "You Pay", subtitle: "USD ".concat(amountToPay.toString()) },
          { title: "Phone", subtitle: "0".concat(topUp.phoneNo) },
          { title: "Amount to buy", subtitle: "NGN ".concat(topUp.amountFiat.toString()) },
        ]}

      />
    </>
  )
}
