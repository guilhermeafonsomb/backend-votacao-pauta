/*
  Warnings:

  - You are about to drop the column `approved` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `value` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approved` to the `Agenda` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "agendaId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Vote_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "Agenda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("agendaId", "id", "userId") SELECT "agendaId", "id", "userId" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
CREATE UNIQUE INDEX "Vote_agendaId_key" ON "Vote"("agendaId");
CREATE TABLE "new_Agenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "approved" BOOLEAN NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60000,
    "yesVotes" INTEGER NOT NULL DEFAULT 0,
    "noVotes" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Agenda" ("duration", "id", "noVotes", "open", "title", "yesVotes") SELECT "duration", "id", "noVotes", "open", "title", "yesVotes" FROM "Agenda";
DROP TABLE "Agenda";
ALTER TABLE "new_Agenda" RENAME TO "Agenda";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
