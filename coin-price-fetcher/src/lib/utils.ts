
const coinAddress = '0x628211398E10a014826bc7d943a39b2cE6126D72'
const DEX_SCANNER_API_URL = `https://api.dexscreener.com/latest/dex/tokens/${coinAddress}`; 

export async function fetchCoinPrice(){
    try{
        const getCurrentCoinDetails = await fetch(DEX_SCANNER_API_URL, { method: 'GET' });
        const getCurrentCoinDetailsParsed = await getCurrentCoinDetails.json();
        const currentCoinPrice = getCurrentCoinDetailsParsed.pairs[0].priceUsd;
        if(currentCoinPrice != null){
            return currentCoinPrice;
        }
        return null
    }catch(error){
        console.log(error);
        console.log('error in fetching coin price in the fetch coin price function');
        return null;
    }
}

export async function initializeCoinPrice(){
    try{
      
       const coinPriceNow = await fetchCoinPrice();
       if(coinPriceNow != null){
           return coinPriceNow;
       }
    
       return null;
    }catch(error){
        console.log('in here in the error clause')
        console.log(error);
        return null;
    }
}
