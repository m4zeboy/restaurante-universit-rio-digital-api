-- CreateEnum
CREATE TYPE "RechargePaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'CANCELED');

-- CreateEnum
CREATE TYPE "RechargePaymentType" AS ENUM ('CREDIT_CARD', 'PIX');

-- CreateTable
CREATE TABLE "RechargePayment" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "RechargePaymentStatus" NOT NULL DEFAULT 'PENDING',
    "type" "RechargePaymentType" NOT NULL DEFAULT 'CREDIT_CARD',
    "name_in_card" TEXT,
    "card_number" TEXT,
    "expiration_date" TIMESTAMP(3),
    "cvc" INTEGER,
    "qr_code" TEXT,

    CONSTRAINT "RechargePayment_pkey" PRIMARY KEY ("id")
);
