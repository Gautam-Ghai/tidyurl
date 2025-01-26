-- CreateTable
CREATE TABLE "shortLink" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "shortLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortLink_slug_key" ON "shortLink"("slug");

-- CreateIndex
CREATE INDEX "shortLink_slug_idx" ON "shortLink"("slug");
