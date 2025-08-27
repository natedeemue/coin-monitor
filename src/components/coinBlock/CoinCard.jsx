import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function Card({ coin }) {
  return (
    <div className='px-4 py-6 bg-white rounded-sm flex items-center gap-6 cursor-grab active:cursor-grabbing'>
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

export default function CoinCard({ coin }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: coin.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card coin={coin} />
    </div>
  )
}
