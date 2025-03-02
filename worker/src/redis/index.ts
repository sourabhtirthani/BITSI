import { createClient , RedisClientType} from "redis";

export class RedisSingleton{  
    private static instance: RedisSingleton;
    private client: RedisClientType | null = null;
    private constructor(){
       
    }
    public static getInstance(): RedisSingleton{
        if(!RedisSingleton.instance){
            RedisSingleton.instance = new RedisSingleton();
        }
        return RedisSingleton.instance;
    }

    public async getClient() : Promise<RedisClientType>{
        try{
            if(!this.client){
                this.client = await createClient();
                console.log(`redis client created`);
                await this.client.connect();
                console.log(`connected to the redis client`);
            }
            return this.client;
        }catch(error){
            this.client = null;
            console.log(`error in redis get client function`);
            console.log(error)
            throw new Error("error in redis get client function");
        }
    }

}