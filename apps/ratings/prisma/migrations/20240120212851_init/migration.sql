-- CreateTable
CREATE TABLE "candidate_reviews" (
    "id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
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
