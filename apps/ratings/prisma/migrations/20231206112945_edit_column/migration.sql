/*
  Warnings:

  - You are about to drop the column `value` on the `candidate_reviews` table. All the data in the column will be lost.
  - Added the required column `rating` to the `candidate_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_reviews" DROP COLUMN "value",
ADD COLUMN     "rating" INTEGER NOT NULL;
