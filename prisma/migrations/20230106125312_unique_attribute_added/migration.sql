/*
  Warnings:

  - A unique constraint covering the columns `[origUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_origUrl_key" ON "Url"("origUrl");
