import dotenv from 'dotenv'
dotenv.config();
import { dropEmbeddingsCollection, getVectorStore } from '../lib/astraDb';
import { DocumentInterface } from '@langchain/core/documents';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
async function generateEmbeddings() {
    try {
        const vectorStore = await getVectorStore();
        await dropEmbeddingsCollection();
        const loader = new DirectoryLoader(
            "app/(root)",
            {
                ".tsx": (path) => new TextLoader(path)
            },
            true
        )
        const docs = (await loader.load()).filter(doc => doc.metadata.source.endsWith("page.tsx"))
            .map((doc): DocumentInterface => {
                const url = doc.metadata.source.replace(/\\/g, "/").split("/app/(root)")[1].split("/page.tsx")[0] || "/"


                // const pageContentTrimmed = doc.pageContent.replace(/^import.*$/gm, "").replace(/ className=["{'].*?["}']/g, "").replace(/^\s*[\r\n]/gm, "").trim();
                //     const pageContentTrimmed = doc.pageContent
                //   .replace(/^import.*$/gm, "") // Remove all import statements
                //   .replace(/^\s*\[.*?\].*=\s*/gm, "") // Remove array destructuring assignments (e.g., [state, setState] = ...)
                //   .replace(/use[A-Za-z]*\([^)]*\);?/g, "") // Remove useState, useEffect, etc.
                //   .replace(/{[^}]*}/g, "").replace(/{.*?}/g, "") 
                //   .replace(/^\s*[\r\n]/gm, "").replace(/ className=["{'].*?["}']/g, "").replace(/^\s*(const|let|var)?\s*\[.*?\].*=\s*.*;?/gm, "")
                //   .replace(/^\s*(const|let|var)?\s+\w+\s*=\s*.*;?/gm, "").replace(/=>/g, "")
                //   .replace(/catch\s*\(.*\)\s*{.*}/g, "")
                //   .replace(/try\s*{.*}/g, "")
                //   .replace(/document\.addEventListener\(.*\);?/g, "").replace(/return\s*\(.*\);?/g, "")
                //   .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
                //   .replace(/^\s*[\r\n]/gm, "")
                //   .trim();
                const pageContentTrimmed = doc.pageContent
                    .replace(/^import.*$/gm, "")
                    .replace(/^\s*\[.*?\].*=\s*/gm, "")
                    .replace(/use[A-Za-z]*\([^)]*\);?/g, "")
                    .replace(/{[^}]*}/g, "").replace(/{.*?}/g, "")
                    .replace(/^\s*[\r\n]/gm, "")
                    .replace(/ className=["{'].*?["}']/g, "")
                    .replace(/^\s*(const|let|var)?\s*\[.*?\].*=\s*.*;?/gm, "")
                    .replace(/^\s*(const|let|var)?\s+\w+\s*=\s*.*;?/gm, "")
                    .replace(/=>/g, "")
                    .replace(/catch\s*\(.*\)\s*{.*}/g, "")
                    .replace(/try\s*{.*}/g, "")
                    .replace(/document\.addEventListener\(.*\);?/g, "")
                    .replace(/return\s*\(.*\);?/g, "")
                    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
                    .replace(/^\s*[\r\n]/gm, "")
                    .replace(/use client'/g, "")
                    .replace(/fileReader\.readAsDataURL\(file\);/g, "")
                    .replace(/if\s*\(!address\)/g, "")
                    .replace(/return;/g, "")
                    .replace(/if\s*\(!file\)/g, "")
                    .replace(/else\s*if\s*\(!formData\.get\('name'\)\)/g, "")
                    .replace(/else\s*if\s*\(!formData\.get\('collection'\)\)/g, "")
                    .replace(/else\s*if\s*\(!formData\.get\('price'\)\)/g, "")
                    .replace(/if\s*\(!file\s*\|\|\s*!formData\.get\('name'\)\s*\|\|\s*!formData\.get\('collection'\)\s*\|\|\s*!formData\.get\('price'\)\)/g, "")
                    .replace(/console\.log\(file\);/g, "")
                    .replace(/setFormData1\(formData\);/g, "")
                    .replace(/setShowCheckout\(true\);/g, "")
                    .replace(/console\.log\('in here in the handle submit after file console log'\);/g, "")
                    .replace(/if\s*\(address\)/g, "")
                    .replace(/if\s*\(!tokenId\s*\|\|\s*!tokenURI\)/g, "")
                    .replace(/return;/g, "")
                    .replace(/if\s*\(transaction\)/g, "")
                    .trim();

                return {
                    pageContent: pageContentTrimmed,
                    metadata: { url }
                }
            })
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
        const splitDocs = await splitter.splitDocuments(docs)
        // console.log(splitDocs)
       await vectorStore.addDocuments(splitDocs);
        // console.log(docs)
    } catch (error) {
        console.log(error)
        console.log(`error in the`)
    }
}


generateEmbeddings();