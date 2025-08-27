import React from 'react'
import Container from './Container'

export default function CoinList() {
  return (
    <div className='grow-[1] flex items-stretch gap-2'>
      <Container title="Possible Coins" />
      <Container title="Watchlist" />
    </div>
  )
}
