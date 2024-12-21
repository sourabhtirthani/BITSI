import express from 'express';
import schedule from 'node-schedule';
import { fetchCoinPrice, initializeCoinPrice } from './lib/utils';

const app = express();
app.use(express.json());
// app.use(cors());


let coinPrice: number | null = null;
async function initilize(){
    coinPrice = await initializeCoinPrice();
}
initilize().then(()=>{
    app.get('/', (req, res) => {
        try{
          res.status(200).json({coinPrice : coinPrice});
        }catch(error){
          res.status(500).json({message : "Internal server error"});
        }
      });
      
      schedule.scheduleJob('0 * * * *', async () => {
          const updatedCoinPrice =await fetchCoinPrice();
          if (updatedCoinPrice !== null) {
              coinPrice = updatedCoinPrice;
              console.log(`Updated coin price: ${coinPrice}`);
          }else{
              console.log('updated coin price is null')
          }
      
      });
      const port = process.env.PORT || 2000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });

}).catch((error)=>{
    console.log('failed to get the price of the coin in the main function')
});


