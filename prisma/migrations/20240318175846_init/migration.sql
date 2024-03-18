-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PasteObject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hasTimeout" BOOLEAN NOT NULL DEFAULT false,
    "timeoutDate" DATETIME,
    "pasteContents" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "isEditable" BOOLEAN NOT NULL DEFAULT true
);
