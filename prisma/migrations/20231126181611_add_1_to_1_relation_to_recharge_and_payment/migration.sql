/*
  Warnings:

  - A unique constraint covering the columns `[wallet_recharge_id]` on the table `RechargePayment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet_recharge_id` to the `RechargePayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RechargePayment" ADD COLUMN     "wallet_recharge_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RechargePayment_wallet_recharge_id_key" ON "RechargePayment"("wallet_recharge_id");

-- AddForeignKey
ALTER TABLE "RechargePayment" ADD CONSTRAINT "RechargePayment_wallet_recharge_id_fkey" FOREIGN KEY ("wallet_recharge_id") REFERENCES "wallet_recharges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
