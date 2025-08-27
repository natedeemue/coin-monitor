import React from 'react'
import CoinCard from './CoinCard'

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function Container({ id, title, coinList }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={coinList.map(c => c.id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-sm px-2 py-6 ${isOver? 'bg-gray-300': 'bg-gray-200'} flex flex-col gap-4`}
      >
        <h4 className='font-bold'>{title}</h4>

        {coinList.map(coin => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </SortableContext>
  )
}
