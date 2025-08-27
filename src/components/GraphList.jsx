import React, { useCallback, useContext } from 'react'

import Chart from "react-apexcharts"

import { CoinListContext } from '../contexts/context';

export default function GraphList() {
  const { coinList: { watchList } } = useContext(CoinListContext)

  const options = useCallback((coin) => ({
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    title: {
      text: `${coin.coinName} Price Chart`
    },
    yaxis: {
      min: 0,
    },
  }), [])

  return (
    <div className='flex-[3] px-2 py-6 bg-[rgba(0,0,0,0.2)] rounded-sm'>
      <h4 className='p-2 bg-gray-900 text-white rounded-sm'>Charts</h4>

      <div className='mt-4 grid grid-cols-2 gap-2'>
        {watchList
          .filter(coin => coin.prices && coin.prices.length > 0)
          .map(
            coin => (
              <div key={coin.id} className='p-3 bg-white rounded-sm'>
                <Chart
                  options={options(coin)}
                  series={[
                    {
                      name: coin.symbol,
                      data: coin.prices,
                    }
                  ]}
                  height={230}
                />
              </div>
            )
          )}
      </div>
    </div>
  )
}
