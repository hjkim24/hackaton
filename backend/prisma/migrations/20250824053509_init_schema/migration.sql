-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "public"."days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "college" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "admissionYear" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SpareTime" (
    "id" SERIAL NOT NULL,
    "spareTime" TEXT NOT NULL,
    "day" "public"."days" NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "SpareTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Preference" (
    "id" SERIAL NOT NULL,
    "preference" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" SERIAL NOT NULL,
    "likedByUserId" INTEGER,
    "likedToUserId" INTEGER,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "public"."User"("nickname");

-- AddForeignKey
ALTER TABLE "public"."SpareTime" ADD CONSTRAINT "SpareTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_likedByUserId_fkey" FOREIGN KEY ("likedByUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_likedToUserId_fkey" FOREIGN KEY ("likedToUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
