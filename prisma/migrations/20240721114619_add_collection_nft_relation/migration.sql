-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_nft_collection_id_fkey" FOREIGN KEY ("nft_collection_id") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
