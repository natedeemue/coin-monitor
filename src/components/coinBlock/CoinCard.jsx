import React from 'react'

export default function CoinCard({ coin }) {
  return (
    <div className='px-4 py-6 bg-white rounded-sm flex items-center gap-6'>
      <img
        src={`/coinIcons/${coin.coinIcon}.png`}
        alt={`${coin.symbol} icon`}
        width={45}
        height={45}
      />
      <p>{coin.coinName} ({coin.symbol})</p>
    </div>
  )
}
