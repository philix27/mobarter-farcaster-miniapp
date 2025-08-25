'use client'
import { useState } from 'react'
import { FaCopy } from 'react-icons/fa6'
import { toast } from 'sonner'
import { AppSelect, BottomModal, Button, Card, Input, Label, TileSimple } from '@/components'
import { AppStores } from '@/lib/zustand'
import { COLLECTOR, mapCountryToData, mapCountryToIso, TokenId } from '@/lib/const'
import { usePrice, useSendToken, } from '@/lib/hooks'
import { RequestFrom, useGetTopUpOperators, useUtility_purchaseDataBundle } from '@/zapi'
import { BalCard } from '../utils/BalCard'
import { cn, pasteTextFromClipboard } from '@/lib/utils'


export default function TopUpData() {
  const [phoneNo, setPhoneNo] = useState<string>('')
  const [showBtm, setShowBtmSheet] = useState<boolean>(false)
  const [operatorId, setOperatorId] = useState('')
  const [operatorPlan, setOperatorPlan] = useState<{ amount: string; desc: string }>()
  const { sendErc20 } = useSendToken()

  const store = AppStores.useSettings()
  const countryCode = mapCountryToData[store.countryIso].callingCodes[0]
  const { amountToPay, handleOnChange } = usePrice()

  const { data } = useGetTopUpOperators();

  const plansList = () => {
    if (!data) return undefined

    const op = data.utility_getTopUpOperators.dataPlan.filter((v) => `${v.operatorId}` === operatorId)[0];

    if (!op) return undefined

    const plans = op.plans;

    const amountDesc = plans?.map((p) => {
      return {
        label: p.desc,
        amount: p.amount,
        symbol: "Blank",
      }
    })

    return amountDesc
  }

  const [mutate] = useUtility_purchaseDataBundle()

  const handleSend = async () => {
    if (operatorPlan === undefined) {
      toast.error('Select an operator')
      return
    }

    const amtValue = parseInt(operatorPlan.amount)

    if (amtValue < 0) {
      toast.error('Amount must be above zero');
      return
    }

    await sendErc20({
      recipient: COLLECTOR,
      amount: amountToPay!.toString(),
      token: TokenId.cUSD,
    })
      .then((txHash: string) => {
        void mutate({
          variables: {
            input: {
              amount: parseInt(operatorPlan.amount),
              countryCode: mapCountryToIso[store.countryIso],
              operatorId: parseInt(operatorId),
              phoneNo: `${countryCode.slice(1)}${phoneNo}`,
              payment: {
                amountCrypto: 0,
                amountFiat: 0,
                fiatCurrency: mapCountryToIso[store.countryIso],
                tokenAddress: '',
                tokenChain: '',
                transaction_pin: '',
                user_uid: '',
                txHash: txHash || `${Date.now()}`,
                from: RequestFrom.Farcaster,
              }
            },
          },
          onCompleted() {
            toast.success('Sent successfully')
            setPhoneNo('')
            setOperatorPlan({ amount: '', desc: '' })
          },
        })
      })
      .catch((err) => {
        toast.error('Error sending cUSD:', err.message)
      })
  }

  return (
    <>
      <div className="w-full items-center justify-center flex flex-col gap-y-4 px-1">
        <BalCard />
        <Input
          label={`Phone NO. (${mapCountryToIso[store.countryIso]})*`}
          placeholder={`8101234567`}
          preText={countryCode}
          value={phoneNo}
          type="number"
          onChange={(e) => {
            const num = e.target.value
            if (num.length > 13) {
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
        {data && (
          <AppSelect
            label="Network*"
            onChange={(id) => {
              setOperatorId(id)
              if (operatorId !== id) {
                setOperatorPlan({ amount: '', desc: '' })
              }
            }}
            data={data.utility_getTopUpOperators.dataBundles.map((val) => {
              return {
                label: val.name,
                value: `${val.operatorId}`,
              }
            })}
          />
        )}

        <div className="w-full ">
          <Label>Selected Plan*</Label>
          {operatorPlan && operatorPlan.desc ? (
            <Card
              className="text-foreground"
              onClick={() => {
                setShowBtmSheet(true)
              }}
            >{` ${mapCountryToData[store.countryIso].currencySymbol} ${operatorPlan!.amount} - ${operatorPlan!.desc
              }`}</Card>
          ) : (
            <Card
              onClick={() => {
                setShowBtmSheet(true)
              }}
            >{`Select a plan`}</Card>
          )}
        </div>

        <div className="w-full ">
          <Label>You Pay (cUSD)</Label>
          <Card>{amountToPay} </Card>
        </div>
        <Button className="mt-5 w-[70%]" onClick={handleSend}>
          Confirm
        </Button>
      </div>
      <BottomModal
        showSheet={showBtm}
        onClose={() => {
          setShowBtmSheet(false)
        }}
      >
        <div className="w-full items-center justify-center flex flex-col">
          {plansList() &&
            plansList()!.map((val, i) => {
              const isActive = operatorPlan && parseInt(operatorPlan.amount) === val.amount
              return (
                <TileSimple
                  key={i}
                  title={`${val.symbol} ${val.amount}`}
                  desc={val.label}
                  className={cn(isActive && 'border-primary border')}
                  onClick={() => {
                    handleOnChange(val.amount)
                    setOperatorPlan({
                      amount: val.amount.toString(),
                      desc: val.label,
                    })
                    setShowBtmSheet(false)
                  }}
                />
              )
            })}
        </div>
      </BottomModal>
    </>
  )
}
