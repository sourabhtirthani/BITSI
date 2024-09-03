import { DocumentInterface } from '@langchain/core/documents';
import {DirectoryLoader} from 'langchain/document_loaders/fs/directory'
import {TextLoader} from 'langchain/document_loaders/fs/text'
async function generateEmbeddings(){
const loader = new DirectoryLoader(
    "app/",
    {
        ".tsx" : (path) => new TextLoader(path)
    },
    true
    )
    const docs =  (await loader.load()).filter(doc => doc.metadata.source.endsWith("page.tsx"))
    // .map((doc) : DocumentInterface =>  doc.pageContent)
    console.log(docs)
}


generateEmbeddings();