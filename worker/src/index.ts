import { createClient } from "redis";
import { puteventToDb } from "./controllers/eventController";

const client = createClient();

async function startWorker(){
    try{
    await client.connect();
    console.log(`connected to the client`);
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