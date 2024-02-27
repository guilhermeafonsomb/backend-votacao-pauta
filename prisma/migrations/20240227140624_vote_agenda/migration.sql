-- CreateTable
CREATE TABLE "Agenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL DEFAULT 1,
    "yesVotes" INTEGER NOT NULL DEFAULT 0,
    "noVotes" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "agendaId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,
    CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "Agenda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_agendaId_key" ON "Vote"("userId", "agendaId");
