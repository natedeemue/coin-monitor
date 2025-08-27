import React from 'react'
import CoinList from './components/coinBlock/CoinList'
import GraphList from './components/GraphList'

function App() {
  return (
    <div className='w-screen h-screen p-2 bg-[#3F82F5] flex items-stretch gap-2'>
      <CoinList />
      <GraphList />
    </div>
  )
}

export default App
