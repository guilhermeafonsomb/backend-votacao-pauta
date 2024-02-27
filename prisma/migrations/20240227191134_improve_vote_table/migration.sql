/*
  Warnings:

  - A unique constraint covering the columns `[userId,agendaId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_agendaId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_agendaId_key" ON "Vote"("userId", "agendaId");
