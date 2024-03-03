/*
  Warnings:

  - Added the required column `category` to the `Agenda` table without a default value. This is not possible if the table is not empty.

*/
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
    "category" TEXT NOT NULL
);
INSERT INTO "new_Agenda" ("approved", "duration", "id", "noVotes", "open", "startTime", "title", "yesVotes") SELECT "approved", "duration", "id", "noVotes", "open", "startTime", "title", "yesVotes" FROM "Agenda";
DROP TABLE "Agenda";
ALTER TABLE "new_Agenda" RENAME TO "Agenda";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
