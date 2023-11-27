/*
  Warnings:

  - You are about to drop the column `amount` on the `wallet_recharges` table. All the data in the column will be lost.
  - Added the required column `requested_amount` to the `wallet_recharges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletRechargeStatus" AS ENUM ('REQUESTED', 'APPROVED', 'CANCELED');

-- AlterTable
ALTER TABLE "wallet_recharges" DROP COLUMN "amount",
ADD COLUMN     "requested_amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "status" "WalletRechargeStatus" NOT NULL DEFAULT 'REQUESTED';
