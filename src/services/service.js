export const getCoinList = async () => {
  // API mock up
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          { id: 1, coinName: 'Bitcoin',  symbol: 'BTC',  coinIcon: 'bitcoin' },
          { id: 2, coinName: 'Ethereum', symbol: 'ETH',  coinIcon: 'ethereum' },
          { id: 3, coinName: 'Tether',   symbol: 'USDT', coinIcon: 'tether' },
          { id: 4, coinName: 'BNB',      symbol: 'BNB',  coinIcon: 'bnb' },
          { id: 5, coinName: 'Solana',   symbol: 'SOL',  coinIcon: 'solana' },
          { id: 6, coinName: 'XRP',      symbol: 'XRP',  coinIcon: 'xrp' },
          { id: 7, coinName: 'Cardano',  symbol: 'ADA',  coinIcon: 'cardano' },
          { id: 8, coinName: 'Dogecoin', symbol: 'DOGE', coinIcon: 'dogecoin' },
        ]
      )
    }, 200)
  })
}

export const getCoinPrice = async () => {
  const data = [50]
  for(let i=1; i<20; i++) {
    let newValue = data[i-1] + (Math.round(Math.random() * 10) - 5)
    data.push(
      newValue < 1 ? 1 : newValue
    )
  }

  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      if(Math.random() < 0.6)
        resolve(data)
      else
        reject(new Error('Failed to fetch coin prices'))
    }, 350)
  })

  return response
}
