import { createClient } from "redis";
import { puteventToDb } from "./controllers/eventController";

const client = createClient();
// redis://localhost:6379

async function startWorker(){
    try{
    await client.connect();
    // Note : The code requires redis to run!
    console.log(`connected to the redis client`);
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