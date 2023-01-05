-- CreateTable
CREATE TABLE "Url" (
    "urlId" TEXT NOT NULL,
    "origUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("urlId")
);
