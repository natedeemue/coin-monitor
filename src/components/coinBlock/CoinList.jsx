import React, { useEffect, useState } from 'react'
import Container from './Container'
import { getCoinList } from '../../services/service';

export default function CoinList() {
  const [unwatchedCoins, setUnwatchedCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coins = await getCoinList();
      setUnwatchedCoins(coins);
    };

    fetchData();
  }, []);

  return (
    <div className='grow-[1] flex items-stretch gap-2'>
      <Container title="Possible Coins" coinList={unwatchedCoins} />
      <Container title="Watchlist" coinList={[]} />
    </div>
  )
}
