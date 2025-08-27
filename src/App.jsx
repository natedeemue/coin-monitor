import React, { useEffect, useState } from 'react'

import CoinList from './components/coinBlock/CoinList'
import GraphList from './components/GraphList'

import { CoinListContext } from './contexts/context';
import { getCoinList } from './services/service';
import { Bounce, ToastContainer } from 'react-toastify';

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
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </CoinListContext.Provider>
    </div>
  )
}

export default App
