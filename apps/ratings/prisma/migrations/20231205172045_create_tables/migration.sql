-- CreateTable
CREATE TABLE "candidate_ratings" (
    "id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_ratings" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_ratings_pkey" PRIMARY KEY ("id")
);

CREATE TRIGGER update_updated_at_candidate_ratings BEFORE UPDATE
    ON candidate_ratings FOR EACH ROW EXECUTE PROCEDURE
    update_updated_at_column();

CREATE TRIGGER update_updated_at_company_ratings BEFORE UPDATE
    ON company_ratings FOR EACH ROW EXECUTE PROCEDURE
    update_updated_at_column();
