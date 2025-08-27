import React from 'react'
import CoinCard from './CoinCard'

export default function Container({ title, coinList }) {
  return (
    <div className='flex-1 rounded-sm px-2 py-6 bg-gray-200 flex flex-col gap-4'>
      <h4 className='font-bold'>{title}</h4>

      {coinList.map(coin => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  )
}
