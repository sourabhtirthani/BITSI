'use server'
import db from "@/db";
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises'; 
import { randomBytes } from 'crypto';

type uploadNFtTyp = { success: boolean } | { error: string } | { id: any };
export const uploadNftAction = async (formdata: FormData | null): Promise<uploadNFtTyp> => {
    try {
        console.log(formdata)
        if (formdata == null) {
            console.log('formdata null ')
            return { error: "Invalid/Missing data" };
        }
        const nftFile = formdata.get('nftFile') as File;
        const name = formdata.get('name') as string;
        const price = parseFloat(formdata.get('price') as string);
        const collection = formdata.get('collection') as string;
        const royalties = parseFloat(formdata.get('royalties') as string);
        const description = formdata.get('description') as string;
        // if (!Number.isFinite(price) || isNaN(price)) {
        //     return { error: "Invalid price format" };
        //   }
      
        //   if (!Number.isFinite(royalties) || isNaN(royalties)) {
        //     return { error: "Invalid royalties format" };
        //   }
        if(!nftFile || !name || !price || !collection || !royalties){
            console.log('in here in the insufficent data proveded clause')
            return {error : "Please fill in all the details"}
        }
        // const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const randomString = randomBytes(8).toString('hex');
        const fileName = `${Date.now()}_${randomString}_${nftFile.name}`;
        // const filePath = path.join(uploadsDir, fileName);

        // if (!fs.existsSync(uploadsDir)) {
        //     fs.mkdirSync(uploadsDir, { recursive: true });
        // }

        // const readableStream = Readable.fromWeb(nftFile.stream() as any);

        // const fileStream = fs.createWriteStream(filePath);
        //  pipeline(readableStream, fileStream);
        const data1 = await nftFile.arrayBuffer();
         await fs.writeFileSync(`${process.cwd()}/public/uploads/${fileName}` , Buffer.from(data1));
        const nftImageUrl = `/uploads/${fileName}`;
        const nft = await db.nft.create({
            data: {
              nft_name: name,
              nft_price: price,
              nft_image: nftImageUrl,
              nft_collection_name: collection,
              nft_collection_id: 1,
              nft_royalties: royalties,
              nft_description: description,
              nft_owner_address: '123456677890', 
              nft_creator_address: '123456677890', 
              nft_mint_time: new Date(),
              is_admin_minted: false,
              nft_liked: 0,
              is_insured: false,
            },
            select: {
              id: true,
            },
          });
          return { success: true, id: nft.id };
    } catch (error) {
        console.log('in here in the error clause at line 68');
        console.log(error);
        return { error: 'Error occured' }
    }
}