import dotenv from 'dotenv'
dotenv.config();
import { DataAPIClient} from "@datastax/astra-db-ts";
import {AstraDBVectorStore} from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_ENDPOINT || '';
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || '';
const collection = process.env.ASTRA_DB_COLLECTION || '';

if(!endpoint || !token || !collection){
    throw new Error("Astra DB credentials error")
}



export async function getVectorStore(){
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({modelName : "text-embedding-3-small"}),
    {
        token,
        endpoint,
        collection,
        collectionOptions : {
            vector : {
                dimension : 1536,
                metric : "cosine"
            }
        }
    }
  )
}


export async function dropEmbeddingsCollection(){
    try{
    const client = new DataAPIClient(token);
    const db = client.db(endpoint);
    // const success1 = await db.dropCollection(collection);
    const collections = await db.collection(collection)
    console.log(collections)
    console.log('i just consoled logged the colletiocn s')
    await  collections.deleteMany({});
        console.log('ath the end of the function')
    }catch(error){
        console.log('in the error clasue of drop embeddings ok ')
    }

    // await db.command({ deleteMany: {} }, { collection: 'users' });
}