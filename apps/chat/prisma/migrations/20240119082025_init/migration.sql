-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT,
    "author_id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
