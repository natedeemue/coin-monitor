import React, { useCallback, useContext, useState } from 'react'

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { Card } from './CoinCard';
import Container from './Container'
import { CoinListContext } from '../../contexts/context';

export default function CoinList() {
  // context API
  const { coinList, setCoinList } = useContext(CoinListContext);
  const [activeCoin, setActiveCoin] = useState(null);

  // hook and functions for DndContext
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const findContainer = useCallback((id) => {
    // Check if the input is containerId
    if (id in coinList)
      return id;

    // if it's not a containerId, it's a coinId (but we need to find its containerId)
    return Object.keys(coinList).find(
      (key) => coinList[key].find(c => c.id === id)
    );
  }, [coinList])

  const handleDragOver = useCallback((event) => {
    console.log('Dragging over', event);
  }, [])

  const handleDragEnd = useCallback((event) => {
    console.log('Drag ended', event);
  }, [])

  return (
    <div className='grow-[1] flex items-stretch gap-2'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(event) => {
          const info = event.active.data.current.sortable
          setActiveCoin(coinList[info.containerId][info.index]);
        }}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="unwatchList" title="Possible Coins" coinList={coinList.unwatchList} />
        <Container id="watchList" title="Watchlist" coinList={coinList.watchList} />
        <DragOverlay>{activeCoin ? <Card coin={activeCoin} /> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}
