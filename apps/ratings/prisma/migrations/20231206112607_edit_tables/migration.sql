/*
  Warnings:

  - You are about to drop the `candidate_ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_ratings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "candidate_ratings";

-- DropTable
DROP TABLE "company_ratings";

-- CreateTable
CREATE TABLE "candidate_reviews" (
    "id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_reviews" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_reviews_pkey" PRIMARY KEY ("id")
);
