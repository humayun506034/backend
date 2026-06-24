/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `Preorder` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Preorder` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Preorder` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Preorder` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Preorder` table. All the data in the column will be lost.
  - Added the required column `name` to the `Preorder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preorderWhen` to the `Preorder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `Preorder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preorder" DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "productName",
DROP COLUMN "quantity",
DROP COLUMN "status",
ADD COLUMN     "endsAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "preorderWhen" TEXT NOT NULL,
ADD COLUMN     "products" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;
