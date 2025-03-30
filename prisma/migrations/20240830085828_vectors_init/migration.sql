-- CreateTable
CREATE TABLE "Vectors" (
    "id" SERIAL NOT NULL,
    "textChunk" TEXT NOT NULL,
    "embedding" JSONB NOT NULL,

    CONSTRAINT "Vectors_pkey" PRIMARY KEY ("id")
);
