-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Edge" (
    "sourceNodeId" TEXT NOT NULL,
    "destinationNodeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("sourceNodeId", "destinationNodeId", "name"),
    CONSTRAINT "Edge_sourceNodeId_fkey" FOREIGN KEY ("sourceNodeId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Edge_destinationNodeId_fkey" FOREIGN KEY ("destinationNodeId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
