// import { createClient } from "redis";
import { puteventToDb } from "./controllers/eventController";
import { getBalanceOfUser } from "./utils/blockchainUtils";
import { RedisSingleton } from "./redis";

// const client = createClient();
// redis://localhost:6379
async function startWorker(){
    try{
        const client  = await RedisSingleton.getInstance().getClient();
        // await client.connect();
        // Note : The code requires redis to run!
    // await getBalanceOfUser('0xe6F9F756ca735b7Ba7E9B1DaEcAE5228AFF0832f');
    // await getBalanceOfUser('0xF168F8E7802cfaFCefa3Ca63a31F305D507F7417');
    while(true){
        const events = await client.brPop("events" , 0);
        if(events?.element){
        await puteventToDb(events?.element);
        }
    }
    }catch(error){
        console.log(error)
        console.log(`error in worker`);
    }

}

startWorker();