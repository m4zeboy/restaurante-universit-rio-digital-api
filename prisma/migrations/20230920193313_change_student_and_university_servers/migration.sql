/*
  Warnings:

  - You are about to drop the column `user_id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `university_servers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[passport]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[passport]` on the table `university_servers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passport` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passport` to the `university_servers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_user_id_fkey";

-- DropForeignKey
ALTER TABLE "university_servers" DROP CONSTRAINT "university_servers_user_id_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "user_id",
ADD COLUMN     "passport" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "university_servers" DROP COLUMN "user_id",
ADD COLUMN     "passport" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_passport_key" ON "students"("passport");

-- CreateIndex
CREATE UNIQUE INDEX "university_servers_passport_key" ON "university_servers"("passport");
