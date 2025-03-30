-- CreateTable
CREATE TABLE "Insurance_events" (
    "id" SERIAL NOT NULL,
    "eventname" TEXT NOT NULL,
    "insuranceid" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Insurance_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Insurance_events" ADD CONSTRAINT "Insurance_events_insuranceid_fkey" FOREIGN KEY ("insuranceid") REFERENCES "Insurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
