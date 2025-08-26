import React from 'react'
import { Card, Label } from '@/components'

export function BalCard() {
  const tokenBalance = 0.00
  // const tokenBalance = useTokenBalance(TokenId.cUSD)

  return (
    <div className="w-full">
      <Label>Balance</Label>
      <Card className="bg-primary text-primary-foreground" >{tokenBalance}</Card>
    </div>
  )
}
