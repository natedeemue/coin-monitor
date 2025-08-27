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
import { getCoinPrice } from '../../services/service';
import { Bounce, toast } from 'react-toastify';

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

  const handleDragEnd = useCallback(async (event) => {
    const { active, over } = event;

    const activeContainer = active.data.current.sortable.containerId
    const overContainer = over.data.current?.sortable.containerId || over.id

    if (
      active.id === over.id ||
      !activeContainer ||
      !overContainer
    ) {
      return;
    }

    const recovery = coinList
    const activeIndex = active.data.current.sortable.index
    const overIndex = over.data.current?.sortable.index ?? -1
    // -1 means "DragEnd on container => append to the end of array"

    setCoinList((items) => {
      const activeCoin = items[activeContainer][activeIndex]
      if(overContainer == 'unwatchList')
        activeCoin.prices = []

      // remove old card
      const removed = {
        ...items,
        [activeContainer]: items[activeContainer].filter((item) => item.id !== active.id),
      }

      return {
        ...removed,
        [overContainer]: overIndex === -1
          ? [...removed[overContainer], activeCoin] // append to end of array
          : [...removed[overContainer].slice(0, overIndex), activeCoin, ...removed[overContainer].slice(overIndex)] // insert into the target array
      }
    })

    setActiveCoin(null);

    if(overContainer == 'watchList' && activeContainer != 'watchList') {
      try {
        const response = await getCoinPrice()
        setCoinList((items) => ({
          ...items,
          [overContainer]: items[overContainer].map(
            (coin) => coin.id === active.id? { ...coin, prices: response }: coin
          )
        }))
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setCoinList(recovery)
      }
    }
  }, [coinList, setCoinList])

  return (
    <div className='flex-[2] flex items-stretch gap-2'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(event) => {
          const info = event.active.data.current.sortable
          setActiveCoin(coinList[info.containerId][info.index]);
        }}
        onDragEnd={handleDragEnd}
      >
        <Container id="unwatchList" title="Possible Coins" coinList={coinList.unwatchList} />
        <Container id="watchList" title="Watchlist" coinList={coinList.watchList} />
        <DragOverlay>{activeCoin ? <Card coin={activeCoin} /> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}
