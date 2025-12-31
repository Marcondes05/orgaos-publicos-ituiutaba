/*
  Warnings:

  - You are about to drop the column `horario` on the `Orgao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orgao" DROP COLUMN "horario",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "horarioAbertura" TEXT,
ADD COLUMN     "horarioFechamento" TEXT;
