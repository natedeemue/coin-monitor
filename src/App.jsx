import React, { useEffect, useState } from 'react'

import CoinList from './components/coinBlock/CoinList'
import GraphList from './components/GraphList'

import { CoinListContext } from './contexts/context';
import { getCoinList } from './services/service';

function App() {
  const [coinList, setCoinList] = useState({
    unwatchList: [],
    watchList: [],
  });

  // fetch API on mount
  useEffect(() => {
    const fetchData = async () => {
      const coins = await getCoinList();
      setCoinList(prev => ({...prev, unwatchList: coins}));
    };

    fetchData();
  }, []);

  return (
    <div className='w-full min-h-screen p-2 bg-[#3F82F5] flex items-stretch gap-2'>
      <CoinListContext.Provider value={{ coinList, setCoinList }}>
        <CoinList />
        <GraphList />
      </CoinListContext.Provider>
    </div>
  )
}

export default App
