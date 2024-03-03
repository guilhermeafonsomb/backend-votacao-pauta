/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Agenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `userId` on table `Vote` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "agendaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Vote_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "Agenda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("agendaId", "id", "userId", "value") SELECT "agendaId", "id", "userId", "value" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
CREATE UNIQUE INDEX "Vote_userId_agendaId_key" ON "Vote"("userId", "agendaId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Category" ("id", "title") SELECT "id", "title" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
CREATE TABLE "new_Agenda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "open" BOOLEAN,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL DEFAULT 60000,
    "yesVotes" INTEGER NOT NULL DEFAULT 0,
    "noVotes" INTEGER NOT NULL DEFAULT 0,
    "startTime" DATETIME,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Agenda_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agenda" ("approved", "categoryId", "duration", "id", "noVotes", "open", "startTime", "title", "yesVotes") SELECT "approved", "categoryId", "duration", "id", "noVotes", "open", "startTime", "title", "yesVotes" FROM "Agenda";
DROP TABLE "Agenda";
ALTER TABLE "new_Agenda" RENAME TO "Agenda";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
