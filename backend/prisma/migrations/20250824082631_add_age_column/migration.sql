/*
  Warnings:

  - Changed the type of `day` on the `SpareTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Days" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- AlterTable
ALTER TABLE "public"."SpareTime" DROP COLUMN "day",
ADD COLUMN     "day" "public"."Days" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "age" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "public"."days";
