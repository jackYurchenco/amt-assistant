-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "analysisResult" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';
