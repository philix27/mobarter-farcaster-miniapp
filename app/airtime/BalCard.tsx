import React from 'react'
import { Card, Label } from '../components'
import { useTokenBalance } from '@/lib/hooks'
import { TokenId } from '@/lib/const'


export  function BalCard() {
  return <Tg />
}

function Tg() {
  const tokenBalance = useTokenBalance(TokenId.cUSD)
  return (
    <div className="w-full">
      <Label>Balance</Label>
      <Card className="bg-primary text-primary-foreground">{tokenBalance}</Card>
    </div>
  )
}
