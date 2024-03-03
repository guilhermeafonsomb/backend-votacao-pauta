/*
  Warnings:

  - You are about to drop the column `category` on the `Agenda` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Agenda` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "open" BOOLEAN,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL DEFAULT 60000,
    "yesVotes" INTEGER NOT NULL DEFAULT 0,
    "noVotes" INTEGER NOT NULL DEFAULT 0,
    "startTime" DATETIME,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Agenda_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agenda" ("approved", "duration", "id", "noVotes", "open", "startTime", "title", "yesVotes") SELECT "approved", "duration", "id", "noVotes", "open", "startTime", "title", "yesVotes" FROM "Agenda";
DROP TABLE "Agenda";
ALTER TABLE "new_Agenda" RENAME TO "Agenda";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
