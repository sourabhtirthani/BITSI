-- CreateTable
CREATE TABLE "Nft" (
    "id" SERIAL NOT NULL,
    "nft_name" TEXT NOT NULL,
    "nft_price" DOUBLE PRECISION NOT NULL,
    "nft_image" TEXT NOT NULL,
    "nft_collection_name" TEXT NOT NULL,
    "nft_collection_id" INTEGER NOT NULL,
    "nft_royalties" DOUBLE PRECISION NOT NULL,
    "nft_description" BYTEA NOT NULL,
    "nft_owner_address" TEXT NOT NULL,
    "nft_creator_address" TEXT NOT NULL,
    "nft_mint_time" TIMESTAMP(3) NOT NULL,
    "is_admin_minted" BOOLEAN NOT NULL,
    "nft_liked" INTEGER,
    "is_insured" BOOLEAN NOT NULL,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nft_events" (
    "id" SERIAL NOT NULL,
    "s_no" INTEGER NOT NULL,
    "nft_event" TEXT NOT NULL,
    "nft_price" DOUBLE PRECISION NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nft_events_pkey" PRIMARY KEY ("id")
);
